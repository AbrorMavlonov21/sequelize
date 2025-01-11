import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from './jwt.service';
import { UserService } from '../user/user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [AuthService, JwtService, UserService],
  exports: [JwtService],
})
export class AuthModule {}
