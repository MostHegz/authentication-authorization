import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';

export class BaseRepository<T> extends Repository<T> {

    protected logger = new Logger('BaseRepository');

    public async getById(id: number): Promise<T> {
        return new Promise(async (resolve, reject) => {
            try {
                const entity = await this.createQueryBuilder('entity')
                    .where('entity.id = :id', { id: id })
                    .getOne();
                resolve(entity);
            } catch (error) {
                this.logger.error(error);
                reject(error);
            }
        });
    }

    public async getAll(): Promise<T[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const entity = await this.createQueryBuilder('entity')
                    .getMany();
                resolve(entity);
            } catch (error) {
                this.logger.error(error);
                reject(error);
            }
        });
    }
}
