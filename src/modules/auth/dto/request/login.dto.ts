import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';
import { ErrorMessage } from 'src/data';

export class LoginDto {

    @ApiProperty({
        example: 'abdelsalam.mostafa@gmail.com',
        description: 'email',
        required: true
    })
    @IsDefined({ message: ErrorMessage.EmailRequired })
    @IsNotEmpty({ message: ErrorMessage.EmailRequired })
    @IsEmail({}, { message: ErrorMessage.InvalidEmail })
    public email: string;

    @ApiProperty({
        example: 'Auth@123',
        description: 'User Password',
        required: true
    })
    @IsNotEmpty({ message: ErrorMessage.PasswordRequired })
    public password: string;

    @ApiProperty({
        example: 'ea5e989d-a2b6-4718-91af-bb1546c16027',
        description: 'Device UUId',
        required: true
    })
    @IsNotEmpty({ message: ErrorMessage.DeviceUUIdRequired })
    public uuid: string;
}
