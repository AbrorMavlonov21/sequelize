import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  fullname?: string;

  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsArray()
  @IsOptional()
  @IsIn(['admin', 'user'], { each: true })
  roles?: string[];
}
