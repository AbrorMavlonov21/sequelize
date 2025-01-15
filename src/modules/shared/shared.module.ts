import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtStrategy } from './jwtStrategy';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntity } from '../user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { config } from '../../../config/index';

@Module({
  imports: [
    JwtModule.register({ secret: config.JWT_ACCESS_SECRET, global: true }),
    SequelizeModule.forFeature([UserEntity]),
  ],
  providers: [UserService, JwtStrategy],
  exports: [UserService, JwtStrategy],
})
export class SharedModule {}
