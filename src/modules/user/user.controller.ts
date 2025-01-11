import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'role/roles.decorator';
import { Role } from 'role/role.enum';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from 'role/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-sequlize')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const { meta } = await this.userService.findByLogin(createUserDto.login);
      if (meta.statusCode === 200) {
        throw new HttpException(
          'User with this Login name already exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      const resData = await this.userService.create(createUserDto);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get-all-sequlize')
  async findAll() {
    try {
      const resData = await this.userService.findAll();
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to find all users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get-sequlize/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const resData = await this.userService.findOne(id);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to find all users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('update-sequlize/:id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const { meta } = await this.userService.findByLogin(updateUserDto.login);
      if (meta.statusCode !== 404) {
        throw new HttpException(
          'User with this Login name already exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      const resData = await this.userService.update(id, updateUserDto);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to update user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('delete-sequlize/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const resData = await this.userService.remove(id);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to delete user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
