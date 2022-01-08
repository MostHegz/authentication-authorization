import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { DefaultRoles } from 'src/data';

export class UserResponse {
    @ApiProperty({
        example: 1,
        description: 'User Id',
        required: true
    })
    @Expose()
    @Type(() => Number)
    public id: number;

    @ApiProperty({
        example: 'Mostafa',
        description: 'User First Name'
    })
    @Expose()
    public firstName: string;

    @ApiProperty({
        example: 'Abdelsalam',
        description: 'User Last Name'
    })
    @Expose()
    public lastName: string;

    @ApiProperty({
        example: 'dummy@dummydomain.com',
        description: 'User Email'
    })
    @Expose()
    public email: string;

    @ApiProperty({
        example: [DefaultRoles.Admin],
        description: 'User roles'
    })
    @Expose()
    public roles: DefaultRoles;
}
