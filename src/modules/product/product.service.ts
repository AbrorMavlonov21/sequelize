import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ResData } from 'lib/resData';
import { ProductEntity } from './entities/product.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductEntity)
    private productModel: typeof ProductEntity,
  ) {}
  async create(
    createProductDto: CreateProductDto,
  ): Promise<ResData<ProductEntity>> {
    const dto = {
      name: createProductDto.name,
      price: createProductDto.price,
      categoryId: createProductDto.categoryId,
    };
    const data = await this.productModel.create(dto);
    const resData = new ResData<ProductEntity>(
      HttpStatus.CREATED,
      'Successfully created',
      data,
    );
    return resData;
  }

  async findAll(): Promise<ResData<Array<ProductEntity>>> {
    const data = await this.productModel.findAll();
    const resData = new ResData<Array<ProductEntity>>(
      HttpStatus.OK,
      'Success',
      data,
    );
    return resData;
  }

  async findOne(id: number): Promise<ResData<ProductEntity>> {
    const data = await this.productModel.findByPk(id);
    const resData = new ResData<ProductEntity>(HttpStatus.OK, 'Success', data);
    return resData;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const dto = {
      name: updateProductDto.name,
      price: updateProductDto.price,
      categoryId: updateProductDto.categoryId,
    };
    const product = await this.productModel.findByPk(id);
    if (!product) {
      throw new HttpException('product not found', HttpStatus.NOT_FOUND);
    }
    const data = await product.update(dto);
    const resData = new ResData<ProductEntity>(
      HttpStatus.OK,
      'Updated Successfully',
      data,
    );

    return resData;
  }

  async remove(id: number): Promise<string> {
    const product = await this.productModel.findByPk(id);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    await product.destroy();
    return `Product successfully deleted`;
  }
}
