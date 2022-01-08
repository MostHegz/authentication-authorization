import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenType, JwtPayload } from 'src/data';

@Injectable()
export class RefreshJwtGuard extends AuthGuard('jwt') {

    handleRequest(err: any, user: any, info: any) {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }

        const token = user as JwtPayload;
        if (token.type !== TokenType.Refresh) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
