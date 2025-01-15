import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileController } from './file.controller';
import { diskStorage } from 'multer';
import { basename, extname } from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: 'uploads',
        filename: (req, file, callback) => {
          const originalName = basename(
            file.originalname,
            extname(file.originalname),
          );
          const fileExtension = extname(file.originalname).toLowerCase();
          callback(null, `${originalName}${fileExtension}`);
        },
      }),
    }),
  ],
  controllers: [FileController],
})
export class FileModule {}
