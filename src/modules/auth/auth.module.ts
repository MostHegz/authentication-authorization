import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository, UserDeviceRepository } from 'src/data/repository';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      UserDeviceRepository
    ]),
    SharedModule,
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
