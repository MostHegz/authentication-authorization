import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ErrorMessage } from 'src/data';

export class RegisterDeviceDto {

    @ApiProperty({
        example: 'ea5e989d-a2b6-4718-91af-bb1546c16027',
        description: 'Device Id',
        required: true
    })
    @IsNotEmpty({ message: ErrorMessage.DeviceUUIdRequired })
    public uuid: string;
}
