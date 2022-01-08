import { Body, Controller, InternalServerErrorException, Logger, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Constants } from 'src/common';
import { DefaultRoles } from 'src/data/enum/role';
import { JwtPayload } from 'src/data/interface/jwt.interface';
import { AuthorizedRoles, AuthorizeGuard, GetToken } from 'src/utilities';
import { AddUserDto, UserResponse } from './dto';
import { UserService } from './user.service';

@ApiBearerAuth(Constants.API_AUTH_NAME)
@Controller(Constants.USER_PATH)
export class UserController {
    private logger = new Logger('UserController');


    constructor(private userService: UserService) { }

    @Post(Constants.ADD_PATH)
    @AuthorizedRoles(DefaultRoles.SuperAdmin)
    @UseGuards(AuthGuard(), AuthorizeGuard)
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
}
