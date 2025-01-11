import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CategoryService } from '../category/category.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryEntity } from '../category/entities/category.entity';
import { ProductEntity } from './entities/product.entity';

@Module({
  imports: [SequelizeModule.forFeature([CategoryEntity, ProductEntity])],
  controllers: [ProductController],
  providers: [ProductService, CategoryService],
})
export class ProductModule {}
