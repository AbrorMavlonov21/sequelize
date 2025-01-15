import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from '../auth/auth.guard';
import { JwtStrategy } from '../shared/jwtStrategy';
import { JwtAuthGuard } from '../shared/jwt.guard';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SequelizeModule.forFeature([UserEntity]), SharedModule],
  controllers: [UserController],
  providers: [UserService, AuthGuard, JwtStrategy, JwtAuthGuard],
  exports: [UserService],
})
export class UserModule {}
