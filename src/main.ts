import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { config } from '../config/index';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const options = new DocumentBuilder()
    .setTitle('My App API')
    .setDescription('API documentation for the Auth and User modules')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, documentFactory);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(config.PORT, (): void => {
    console.log('http://localhost:3000');
  });
}
bootstrap();
