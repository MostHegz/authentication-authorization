import { HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { PATH_METADATA } from '@nestjs/common/constants';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ErrorMessage, JwtPayload, TokenType, UserDeviceRepository, UserDeviceStatus } from 'src/data';
import { Constants } from 'src/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reflector } from '@nestjs/core';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger('JwtStrategy');

  constructor(
    @InjectRepository(UserDeviceRepository)
    private userDeviceRepository: UserDeviceRepository,
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
        // TODO: get token from redis instead of postgres

        const device = await this.userDeviceRepository.getUserDeviceByUUId(payload.userDevice, payload.userId);
        if (!device || device?.status === UserDeviceStatus.Blocked) {
          return reject(new HttpException({ key: ErrorMessage.UnauthorizedUser }, HttpStatus.UNAUTHORIZED));
        }
        resolve(payload);
      } catch (error) {
        this.logger.error(error);
        return reject(new InternalServerErrorException());
      }
    });
  }
}
