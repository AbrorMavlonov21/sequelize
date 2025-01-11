import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryEntity } from './entities/category.entity';
import { ResData } from 'lib/resData';
import { ProductEntity } from '../product/entities/product.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CategoryEntity)
    private categoryModel: typeof CategoryEntity,
  ) {}
  async create(dto: CreateCategoryDto): Promise<ResData<CategoryEntity>> {
    const categoryToCreate = {
      name: dto.name,
    };
    const data = await this.categoryModel.create(categoryToCreate);
    const resData = new ResData<CategoryEntity>(
      HttpStatus.CREATED,
      'Successfully Created',
      data,
    );
    return resData;
  }

  async findAll(): Promise<ResData<Array<CategoryEntity>>> {
    const data = await this.categoryModel.findAll();

    const resData = new ResData<Array<CategoryEntity>>(
      HttpStatus.OK,
      'Success',
      data,
    );

    return resData;
  }

  async findOne(id: number): Promise<ResData<CategoryEntity>> {
    const data = await this.categoryModel.findByPk(id, {
      include: ProductEntity,
    });
    if (!data) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    const resData = new ResData<CategoryEntity>(HttpStatus.OK, 'Success', data);
    return resData;
  }
  async findByName(name: string): Promise<ResData<CategoryEntity | undefined>> {
    const data = await this.categoryModel.findOne({ where: { name } });
    const resData = new ResData<CategoryEntity | undefined>(
      HttpStatus.OK,
      'Success',
      data,
    );
    if (!data) {
      resData.meta.statusCode = 404;
      resData.meta.message = 'Category not found by Login';
    }
    return resData;
  }

  async update(
    id: number,
    dto: UpdateCategoryDto,
  ): Promise<ResData<CategoryEntity>> {
    const categoryToUpdate = {
      name: dto.name,
    };
    const category = await this.categoryModel.findByPk(id);
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    const data = await category.update(categoryToUpdate);
    const resData = new ResData<CategoryEntity>(
      HttpStatus.OK,
      'Successfully Updated',
      data,
    );
    return resData;
  }

  async remove(id: number): Promise<string> {
    const category = await this.categoryModel.findByPk(id);
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    await category.destroy();
    return 'Successfully deleted';
  }
}
