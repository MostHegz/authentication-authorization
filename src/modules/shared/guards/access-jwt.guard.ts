import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenType, JwtPayload } from 'src/data';

@Injectable()
export class AccessJwtGuard extends AuthGuard('jwt') {

    handleRequest(err: any, user: any, info: any) {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }

        const token = user as JwtPayload;
        if (token.type !== TokenType.Access) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
