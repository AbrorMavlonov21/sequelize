import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from '../../../config/index';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: config.DB_HOST,
      port: Number(config.DB_PORT),
      username: config.DB_USER,
      password: config.DB_PASSWORD,
      database: config.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
})
export class SequelizeConfigModule {}
