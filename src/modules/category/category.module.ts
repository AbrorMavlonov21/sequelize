import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryEntity } from './entities/category.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductEntity } from '../product/entities/product.entity';

@Module({
  imports: [SequelizeModule.forFeature([CategoryEntity, ProductEntity])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
