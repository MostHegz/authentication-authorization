import { EntityRepository } from 'typeorm';
import { UserDevice } from '../model/user-device.model';
import { BaseRepository } from './base.repository';

@EntityRepository(UserDevice)
export class UserDeviceRepository extends BaseRepository<UserDevice> {

    public async getUserDeviceByUUId(uuid: string): Promise<UserDevice> {
        return new Promise(async (resolve, reject) => {
            try {
                const device = await this.createQueryBuilder('device')
                    .where('device.uuid = :uuid', { uuid }).getOne();
                resolve(device);
            } catch (error) {
                this.logger.error(error);
                reject(error);
            }
        });
    }
}
