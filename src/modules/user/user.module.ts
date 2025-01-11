import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '../auth/jwt.service';

@Module({
  imports: [SequelizeModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, AuthGuard, JwtService],
  exports: [UserService],
})
export class UserModule {}
