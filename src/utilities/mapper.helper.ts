import { Logger } from '@nestjs/common';
import { ClassConstructor, classToPlain, plainToClass } from 'class-transformer';

export class MapperHelper {
    static logger = new Logger('UserRepository');

    static toClient<T>(classType: ClassConstructor<T>, fromObject: Object): T {
        const serializeObject = classToPlain(fromObject, { enableImplicitConversion: false });
        const mapped = plainToClass(classType, serializeObject, { excludeExtraneousValues: true });
        return mapped;
    }

    static toClientList<T>(classType: ClassConstructor<T>, fromObjectList: Object[]): T[] {
        const returnList: T[] = [];
        for (const fromObject of fromObjectList) {
            returnList.push(this.toClient(classType, fromObject));
        }
        return returnList;
    }
}
