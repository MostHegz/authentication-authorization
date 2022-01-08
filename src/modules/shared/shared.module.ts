import { HttpModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Constants } from 'src/common';
import { UserDeviceRepository } from 'src/data';
import { JwtHandlerService } from './jwt-handler.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserDeviceRepository
    ]),
    HttpModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: Constants.JWT_SECRET_KEY
    })
  ],
  controllers: [],
  providers: [
    JwtHandlerService,
    JwtStrategy
  ],
  exports: [
    PassportModule,
    JwtHandlerService,
    JwtStrategy
  ]
})
export class SharedModule { }
