import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { Constants } from 'src/common';
import { ErrorMessage, AvailableDefaultRoles, DefaultRoles } from 'src/data';

export class AddUserDto {

    @ApiProperty({
        example: 'Mostafa',
        description: 'First Name',
        required: false
    })
    @IsOptional()
    @IsNotEmpty({ message: ErrorMessage.FirstNameBlank })
    public firstName: string;

    @ApiProperty({
        example: 'Abdelsalam',
        description: 'Last Name',
        required: true
    })
    @IsOptional()
    @IsNotEmpty({ message: ErrorMessage.LastNameBlank })
    public lastName: string;

    @ApiProperty({
        example: 'dummy@dummydomain.com',
        description: 'email',
        required: true
    })
    @IsEmail({}, { message: ErrorMessage.InvalidEmail })
    public email: string;

    @ApiProperty({
        example: 'Auth@123',
        description: 'User Password',
        required: true
    })
    @Matches(Constants.PASSWORD_REGEX, { message: ErrorMessage.InvalidPassword })
    public password: string;

    @ApiProperty({
        example: [AvailableDefaultRoles.Admin],
        description: 'role',
        required: true
    })
    @IsArray({ message: ErrorMessage.SomethingWentWrong })
    @IsEnum(AvailableDefaultRoles, { each: true, message: ErrorMessage.InvalidRole })
    public roles: DefaultRoles[];
}
