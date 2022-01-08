import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { DefaultRoles } from 'src/data/enum/role';

export class AuthResponse {
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
        example: 'abdelslam.mostafa@gmail.com',
        description: 'User Email'
    })
    @Expose()
    public email: string;

    @ApiProperty({
        example: DefaultRoles.Buyer,
        description: 'User Roles'
    })
    @Expose()
    public roles: DefaultRoles[];

    @ApiProperty({
        example: '2022-01-07T22:00:00.000Z',
        description: 'User created at'
    })
    @Expose()
    public createdAt: string;

    @ApiProperty({
        example: '2022-01-07T22:00:00.000Z',
        description: 'User updated at'
    })
    @Expose()
    public updatedAt: string;

    @ApiProperty({
        example: '',
        description: 'User Access Token'
    })
    @Expose()
    public accessToken: string;

    @ApiProperty({
        example: '',
        description: 'User Refresh Token'
    })
    @Expose()
    public refreshToken: string;
}
