import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Constants } from 'src/common';
import { ErrorMessage, JwtPayload } from 'src/data';

@Injectable()
export class JwtHandlerService {
    private logger = new Logger('JwtHandler');

    constructor(private jwtService: JwtService) { }

    public async encode(payload: JwtPayload, expire: string): Promise<string> {
        let token;
        token = this.jwtService.sign(
            {
                roles: payload.roles,
                userDevice: payload.userDevice,
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email,
                type: payload.type
            },
            {
                secret: Constants.JWT_SECRET_KEY,
                algorithm: Constants.JWT_ENCODE_ALGORITHM as any,
                expiresIn: expire,
                subject: payload.userId.toString()
            }
        );
        return token;
    }

    public decode(token: string): JwtPayload {
        try {
            let payload: JwtPayload;
            const decoded: any = this.jwtService.verify(token, {
                secret: Constants.JWT_SECRET_KEY,
                algorithms: ([Constants.JWT_ENCODE_ALGORITHM] as any)
            });

            payload = {
                userId: decoded['sub'],
                roles: decoded['roles'],
                userDevice: decoded['userDevice'],
                firstName: decoded['firstName'],
                lastName: decoded['lastName'],
                email: decoded['email'],
                expire: decoded['exp'],
                type: decoded['type']
            };

            return payload;
        } catch (error) {
            this.logger.error(error);
            if (error?.message?.includes('expired')) {
                throw (new HttpException({ message: ErrorMessage.UnauthorizedUser }, HttpStatus.UNAUTHORIZED));
            }
            throw error;
        }
    }

    public isJWTExpired(token: string): boolean {
        const decodedToken = this.decode(token);
        if (parseInt(decodedToken.expire, 10) < new Date().getTime() / 1000) {
            return true;
        }
        return false;
    }
}
