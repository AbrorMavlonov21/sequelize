import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { config } from '../../../config/index';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { IMeta } from 'lib/resData';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.JWT_ACCESS_SECRET,
    });
  }

  async validate(payload: any): Promise<{
    roles: string[];
    meta: IMeta;
    data: UserEntity;
  }> {
    console.log('Validating JWT payload:', payload);
    const user = await this.userService.findOne(payload.id);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return { ...user, roles: user.data.roles };
  }
}
