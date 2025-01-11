import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserEntity } from './entities/user.entity';
import { ResData } from 'lib/resData';
import { Bcrypt } from 'lib/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity)
    private userModel: typeof UserEntity,
  ) {}
  async create(dto: CreateUserDto): Promise<ResData<UserEntity>> {
    const userToCreate = {
      fullname: dto.fullname,
      login: dto.login,
      password: await Bcrypt.hash(dto.password),
      roles: dto.roles,
    };
    const data = await this.userModel.create(userToCreate);
    const resData = new ResData<UserEntity>(
      HttpStatus.CREATED,
      'Created Successfully',
      data,
    );
    return resData;
  }

  async findAll(): Promise<ResData<Array<UserEntity>>> {
    const data = await this.userModel.findAll();
    const resData = new ResData(HttpStatus.OK, 'Success', data);
    return resData;
  }

  async findOne(id: number): Promise<ResData<UserEntity>> {
    const data = await this.userModel.findByPk(id);
    const resData = new ResData(HttpStatus.OK, 'Success', data);
    return resData;
  }

  async findByLogin(login: string): Promise<ResData<UserEntity | undefined>> {
    const data = await this.userModel.findOne({ where: { login } });
    const resData = new ResData<UserEntity | undefined>(
      HttpStatus.OK,
      'Success',
      data,
    );
    if (!data) {
      resData.meta.statusCode = 404;
      resData.meta.message = 'User not found by Login';
    }
    return resData;
  }

  async update(id: number, dto: UpdateUserDto) {
    const userToUpdate = {
      fullname: dto.fullname,
      login: dto.login,
      password: await Bcrypt.hash(dto.password),
      roles: dto.roles,
    };
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const data = await user.update(userToUpdate);
    const resData = new ResData(HttpStatus.OK, 'Updated Successfully', data);

    return resData;
  }

  async remove(id: number): Promise<string> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await user.destroy();
    return `User successfully deleted`;
  }
}
