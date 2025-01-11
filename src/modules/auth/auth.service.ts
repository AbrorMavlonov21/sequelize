import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResData } from 'lib/resData';
import { JwtService } from './jwt.service';
import { UserService } from '../user/user.service';
import { Bcrypt } from 'lib/bcrypt';
import { UserEntity } from '../user/entities/user.entity';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async login(dto: CreateAuthDto): Promise<ResData<UserEntity>> {
    const foundUser = await this.userService.findByLogin(dto.login);
    if (!foundUser) {
      throw new HttpException(
        'login or password is wrong!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const validPassword = await Bcrypt.compare(
      dto.password,
      foundUser.data.password,
    );
    if (!validPassword) {
      throw new HttpException(
        'login or password is wrong!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const token = this.jwtService.generate({
      id: foundUser.data.id,
      roles: foundUser.data.roles,
    });
    const resData = new ResData<UserEntity>(
      HttpStatus.OK,
      'success',
      foundUser.data,
      {
        token,
      },
    );
    return resData;
  }
  async register(dto: CreateAuthDto): Promise<ResData<UserEntity>> {
    const { meta } = await this.userService.findByLogin(dto.login);

    if (meta.statusCode !== 404) {
      throw new HttpException(
        'User with this phone number already exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    const resData = await this.userService.create(dto);
    return resData;
  }
}
