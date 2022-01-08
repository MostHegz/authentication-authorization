import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/data';
import { Constants } from 'src/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger('JwtStrategy');

  constructor(

  ) {
    super({
      secretOrKey: Constants.JWT_SECRET_KEY,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    return new Promise(async (resolve, reject) => {
      try {
        // TODO: check if token exists in redis
        resolve(payload);
      } catch (error) {
        this.logger.error(error);
        return reject(new InternalServerErrorException());
      }
    });
  }
}
