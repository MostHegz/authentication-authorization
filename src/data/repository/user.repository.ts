import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository } from 'typeorm';
import { User } from '../model/user.model';
import { BaseRepository } from './base.repository';

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {

    public async getUserByEmail(email: string): Promise<User> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await this.createQueryBuilder('user')
                    .leftJoinAndSelect('user.userDevices', 'userDevices')
                    .where('user.email = :email', { email }).getOne();
                resolve(user);
            } catch (error) {
                this.logger.error(error);
                return reject(new InternalServerErrorException());
            }
        });
    }

    public async getUserDetailsById(id: number, uuid?: string): Promise<User> {
        return new Promise(async (resolve, reject) => {
            try {
                const userQuery = this.createQueryBuilder('user')
                    .leftJoinAndSelect('user.userDevices', 'userDevices')
                    .where('user.id = :id', { id });
                if (uuid) {
                    userQuery.andWhere('userDevices.uuid = :uuid', { uuid });
                }
                const user = await userQuery.getOne();
                resolve(user);
            } catch (error) {
                this.logger.error(error);
                return reject(new InternalServerErrorException());
            }
        });
    }
}
