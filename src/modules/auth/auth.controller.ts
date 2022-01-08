import { Body, Controller, InternalServerErrorException, Logger, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Constants } from 'src/common';
import { JwtPayload } from 'src/data';
import { GetToken } from 'src/utilities';
import { RefreshJwtGuard } from '../shared/guards';
import { AuthService } from './auth.service';
import { AuthResponse, LoginDto, RegisterDeviceDto } from './dto';

@Controller(Constants.AUTH_PATH)
export class AuthController {
    private logger = new Logger('AuthController');
    constructor(private authService: AuthService) { }

    @Post(Constants.REGISTER_DEVICE_PATH)
    @ApiOperation({ summary: 'Register user device', tags: [Constants.AUTH_TAG] })
    @ApiResponse({ status: 200, description: 'Device Registered' })
    @UsePipes(ValidationPipe)
    registerDevice(@Body() registerDeviceDto: RegisterDeviceDto): Promise<string> {
        try {
            return this.authService.registerUserDevice(registerDeviceDto);
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException();
        }
    }

    @Post(Constants.LOGIN_PATH)
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: 'Login', tags: [Constants.AUTH_TAG] })
    @ApiResponse({ status: 200, description: 'Device Registered', type: AuthResponse })
    login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
        try {
            return this.authService.login(loginDto);
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException();
        }
    }

    @Post(Constants.REFRESH_ACCESS_TOKEN)
    @UsePipes(ValidationPipe)
    @UseGuards(RefreshJwtGuard)
    @ApiBearerAuth(Constants.API_AUTH_NAME)
    @ApiOperation({ summary: 'Refresh Access Token', tags: [Constants.AUTH_TAG] })
    @ApiResponse({ status: 200, description: 'Access Token Refreshed', type: AuthResponse })
    refreshAccessToken(@GetToken() token: JwtPayload): Promise<AuthResponse> {
        try {
            return this.authService.refreshAccessToken(token);
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException();
        }
    }
}
