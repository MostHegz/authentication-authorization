import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/data/repository';
import { SharedModule } from '../shared/shared.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository
    ]),
    SharedModule,
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
