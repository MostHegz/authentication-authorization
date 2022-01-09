import { HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultRoles, ErrorMessage, JwtPayload, SuccessMessage, User, UserDeviceRepository, UserRepository } from 'src/data';
import { MapperHelper, PasswordHelper } from 'src/utilities';
import { AddUserDto, UpdateUserRolesDto, UserResponse } from './dto';

@Injectable()
export class UserService {
    private logger = new Logger('UserService');

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) { }

    public async addUser(addUserDto: AddUserDto, currentToken: JwtPayload): Promise<UserResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await this.userRepository.getUserByEmail(addUserDto.email);
                if (user) {
                    return reject(new HttpException({ message: ErrorMessage.UserAlreadyExist, property: 'email' }, HttpStatus.BAD_REQUEST));
                }

                const newUser = new User();
                newUser.email = addUserDto.email;
                newUser.firstName = addUserDto.firstName;
                newUser.lastName = addUserDto.lastName;
                newUser.roles = addUserDto.roles;

                const creator = new User();
                creator.id = currentToken.userId;
                newUser.createdBy = creator;
                newUser.updatedBy = creator;

                // TODO: Create email verification service through which user can add his password personally
                newUser.password = await PasswordHelper.hashPassword(addUserDto.password);

                const addedUser = await this.userRepository.save(newUser);
                const response = MapperHelper.toClient(UserResponse, addedUser);
                resolve(response);
            } catch (error) {
                this.logger.error(error);
                return reject(new InternalServerErrorException());
            }
        });
    }

    public async updateRoles(updateUserRolesDto: UpdateUserRolesDto, token: JwtPayload): Promise<UserResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await this.userRepository.getUserDetailsById(updateUserRolesDto.userId);
                if (!user) {
                    return reject(new HttpException({ message: ErrorMessage.UserNotExist, property: 'userId' }, HttpStatus.NOT_FOUND));
                }

                if (user.roles.includes(DefaultRoles.SuperAdmin)) {
                    return reject(new HttpException({ message: ErrorMessage.CannotUpdateUser, property: 'userId' }, HttpStatus.BAD_REQUEST));
                }

                user.roles = updateUserRolesDto.roles;

                const updatingUser = new User();
                updatingUser.id = token.userId;
                user.updatedBy = updatingUser;

                // this revoke all devices from the user
                user.userDevices = [];
                const updatedUser = await this.userRepository.save(user);
                const response = MapperHelper.toClient(UserResponse, updatedUser);
                resolve(response);
            } catch (error) {
                this.logger.error(error);
                return reject(new InternalServerErrorException());
            }
        });
    }

    public async getUserById(id: number): Promise<UserResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await this.userRepository.getUserDetailsById(id);
                if (!user) {
                    return reject(new HttpException({ message: ErrorMessage.UserNotExist, property: 'userId' }, HttpStatus.NOT_FOUND));
                }

                const response = MapperHelper.toClient(UserResponse, user);
                resolve(response);
            } catch (error) {
                this.logger.error(error);
                return reject(new InternalServerErrorException());
            }
        });
    }

    public async getAllUsers(): Promise<UserResponse[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const users = await this.userRepository.getAll();
                const response = MapperHelper.toClientList(UserResponse, users);
                resolve(response);
            } catch (error) {
                this.logger.error(error);
                return reject(new InternalServerErrorException());
            }
        });
    }
}
