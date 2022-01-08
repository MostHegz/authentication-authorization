import { HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constants } from 'src/common';
import { ErrorMessage, JwtPayload, SuccessMessage, TokenType, UserDevice } from 'src/data';
import { UserRepository, UserDeviceRepository } from 'src/data/repository';
import { MapperHelper, PasswordHelper } from 'src/utilities';
import { JwtHandlerService } from '../shared/jwt-handler.service';
import { AuthResponse, LoginDto, RegisterDeviceDto } from './dto';

@Injectable()
export class AuthService {

    private logger = new Logger('AuthService');

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        @InjectRepository(UserDeviceRepository)
        private userDeviceRepository: UserDeviceRepository,
        private jwtHandlerService: JwtHandlerService,
    ) { }

    public async registerUserDevice(registerDeviceDto: RegisterDeviceDto): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                const device = await this.userDeviceRepository.getUserDeviceByUUId(registerDeviceDto.uuid);
                if (device) {
                    return resolve(SuccessMessage.DeviceRegisteredSuccessfully);
                }

                const newDevice = new UserDevice();
                newDevice.uuid = registerDeviceDto.uuid;
                await this.userDeviceRepository.save(newDevice);
                resolve(SuccessMessage.DeviceRegisteredSuccessfully);
            } catch (error) {
                this.logger.error(error);
                return reject(new InternalServerErrorException());
            }
        });
    }

    public async login(loginDto: LoginDto): Promise<AuthResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await this.userRepository.getUserByEmail(loginDto.email);
                if (!user) {
                    return reject(new HttpException({ message: ErrorMessage.WrongEmailOrPassword }, HttpStatus.BAD_REQUEST));
                }
                const validPassword = await PasswordHelper.comparePassword(loginDto.password, user.password);
                if (!validPassword) {
                    return reject(new HttpException({ message: ErrorMessage.WrongEmailOrPassword }, HttpStatus.BAD_REQUEST));
                }

                const device = await this.userDeviceRepository.getUserDeviceByUUId(loginDto.uuid);
                if (!device) {
                    return reject(new HttpException({ message: ErrorMessage.SomethingWentWrong, property: 'uuid' }, HttpStatus.NOT_FOUND));
                }
                const payload: JwtPayload = {
                    userId: user.id,
                    roles: user.roles,
                    userDevice: device.uuid,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    type: TokenType.Access
                };
                device.accessToken = await this.jwtHandlerService.encode(payload, Constants.JWT_ACCESS_EXPIRY);

                payload.type = TokenType.Refresh;
                device.refreshToken = await this.jwtHandlerService.encode(payload, Constants.JWT_REFRESH_EXPIRY);
                const deviceIndex = user.userDevices.findIndex(userDevice => userDevice.uuid === loginDto.uuid);
                if (deviceIndex >= 0) {
                    user.userDevices[deviceIndex] = device;
                } else {
                    user.userDevices.push(device);
                }
                const updatedUser = await this.userRepository.save(user);
                const response = MapperHelper.toClient(AuthResponse, updatedUser);
                response.accessToken = device.accessToken;
                response.refreshToken = device.refreshToken;
                resolve(response);
            } catch (error) {
                this.logger.error(error);
                return reject(new InternalServerErrorException());
            }
        });
    }

    public async refreshAccessToken(token: JwtPayload): Promise<AuthResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await this.userRepository.getUserDetailsById(token.userId, token.userDevice);
                if (!user) {
                    return reject(new HttpException({ key: ErrorMessage.UnauthorizedUser }, HttpStatus.UNAUTHORIZED));
                }

                const payload: JwtPayload = {
                    userId: user.id,
                    roles: user.roles,
                    userDevice: user.userDevices[0].uuid,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    type: TokenType.Access
                };
                user.userDevices[0].accessToken = await this.jwtHandlerService.encode(payload, Constants.JWT_ACCESS_EXPIRY);

                payload.type = TokenType.Refresh;
                user.userDevices[0].refreshToken = await this.jwtHandlerService.encode(payload, Constants.JWT_REFRESH_EXPIRY);

                const updatedUser = await this.userRepository.save(user);
                const response = MapperHelper.toClient(AuthResponse, updatedUser);
                response.accessToken = user.userDevices[0].accessToken;
                response.refreshToken = user.userDevices[0].refreshToken;

                resolve(response);
            } catch (error) {
                this.logger.error(error);
                return reject(new InternalServerErrorException());
            }
        });
    }

}
