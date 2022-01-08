import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsDefined, IsEnum } from 'class-validator';
import { ErrorMessage, AvailableDefaultRoles, DefaultRoles } from 'src/data';

export class UpdateUserRolesDto {

    @ApiProperty({
        example: 1,
        description: 'User id',
        required: false
    })
    @IsDefined({ message: ErrorMessage.UserRequired })
    @Type(() => Number)
    public userId: number;

    @ApiProperty({
        example: [AvailableDefaultRoles.Admin],
        description: 'role',
        required: true
    })
    @ArrayNotEmpty({ message: ErrorMessage.SomethingWentWrong })
    @IsArray({ message: ErrorMessage.SomethingWentWrong })
    @IsEnum(AvailableDefaultRoles, { each: true, message: ErrorMessage.InvalidRole })
    public roles: DefaultRoles[];
}
