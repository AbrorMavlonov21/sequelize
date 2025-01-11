import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from 'role/roles.guard';
import { Role } from 'role/role.enum';
import { Roles } from 'role/roles.decorator';
// import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
// @ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  // @ApiBody({ type: CreateAuthDto })
  // @ApiResponse({ status: 201, description: 'User Logined Successfully' })
  // @ApiResponse({ status: 400, description: 'Failed to LOgin' })
  async login(@Body() createAuthDto: CreateAuthDto) {
    try {
      const resData = await this.authService.login(createAuthDto);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to Login',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post('registor')
  // @ApiBody({ type: CreateUserDto })
  // @ApiResponse({ status: 201, description: 'User registered Successfully' })
  // @ApiResponse({ status: 400, description: 'Failed to Register' })
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  async registor(@Body() createUserDto: CreateUserDto) {
    try {
      const resData = await this.authService.register(createUserDto);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to Register',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
