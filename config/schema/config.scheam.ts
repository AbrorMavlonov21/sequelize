import { IsNumber, IsString, Min, Max, IsNotEmpty } from 'class-validator';

export class EnvironmentVariables {
  @IsNumber()
  @Min(1000)
  @Max(9999)
  PORT: number;

  @IsString()
  @IsNotEmpty()
  DB_URL: string;

  @IsString()
  @IsNotEmpty()
  JWT_ACCESS_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_SECRET: string;
}
