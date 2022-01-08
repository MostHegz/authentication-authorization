import { Body, Controller, Get, InternalServerErrorException, Logger, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Constants } from 'src/common';
import { JwtPayload } from 'src/data';
import { DefaultRoles } from 'src/data/enum/role';
import { AuthorizedRoles, GetToken } from 'src/utilities';
import { AccessJwtGuard, RoleGuard } from '../shared/guards';
import { AddUserDto, UpdateUserRolesDto, UserResponse } from './dto';
import { UserService } from './user.service';

@ApiBearerAuth(Constants.API_AUTH_NAME)
@Controller(Constants.USER_PATH)
export class UserController {
    private logger = new Logger('UserController');

    constructor(private userService: UserService) { }

    @Post(Constants.ADD_PATH)
    @AuthorizedRoles(DefaultRoles.SuperAdmin)
    @UseGuards(AccessJwtGuard, RoleGuard)
    @ApiOperation({ summary: 'Add user', tags: [Constants.USER_TAG] })
    @ApiResponse({ status: 200, description: 'User Added', type: UserResponse })
    @UsePipes(ValidationPipe)
    registerDevice(@Body() addUserDto: AddUserDto, @GetToken() token: JwtPayload): Promise<UserResponse> {
        try {
            return this.userService.addUser(addUserDto, token);
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException();
        }
    }

    @Put(`${Constants.UPDATE_ROLES}`)
    @AuthorizedRoles(DefaultRoles.SuperAdmin)
    @UseGuards(AccessJwtGuard, RoleGuard)
    @ApiOperation({ summary: 'Update user', tags: [Constants.USER_TAG] })
    @ApiResponse({ status: 200, description: 'User Updated', type: UserResponse })
    @UsePipes(ValidationPipe)
    updateUserRoles(@Body() updateUserRolesDto: UpdateUserRolesDto, @GetToken() token: JwtPayload): Promise<UserResponse> {
        try {
            return this.userService.updateRoles(updateUserRolesDto, token);
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException();
        }
    }

    @Get(`${Constants.ALL_USERS}`)
    @AuthorizedRoles(DefaultRoles.SuperAdmin, DefaultRoles.Admin)
    @UseGuards(AccessJwtGuard, RoleGuard)
    @ApiOperation({ summary: 'Update user', tags: [Constants.USER_TAG] })
    @ApiResponse({ status: 200, description: 'User Updated', type: [UserResponse] })
    @UsePipes(ValidationPipe)
    getAllUsers(): Promise<UserResponse[]> {
        try {
            return this.userService.getAllUsers();
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException();
        }
    }

    @Get(`${Constants.BY_ID_PATH}`)
    @AuthorizedRoles(DefaultRoles.SuperAdmin, DefaultRoles.Admin)
    @UseGuards(AccessJwtGuard, RoleGuard)
    @ApiOperation({ summary: 'Update user', tags: [Constants.USER_TAG] })
    @ApiResponse({ status: 200, description: 'User Updated', type: UserResponse })
    @UsePipes(ValidationPipe)
    getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserResponse> {
        try {
            return this.userService.getUserById(id);
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException();
        }
    }
}
