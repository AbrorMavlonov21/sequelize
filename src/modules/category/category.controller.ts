import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create-sequlize')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      const { meta } = await this.categoryService.findByName(
        createCategoryDto.name,
      );
      if (meta.statusCode !== 404) {
        throw new HttpException(
          'Catergory already exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      const resData = await this.categoryService.create(createCategoryDto);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to create category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get-all-sequlize')
  async findAll() {
    try {
      const resData = await this.categoryService.findAll();
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to find all categories',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get-sequlize/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const resData = await this.categoryService.findOne(id);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to find category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('update-sequlize/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      const { meta } = await this.categoryService.findByName(
        updateCategoryDto.name,
      );
      if (meta.statusCode !== 404) {
        throw new HttpException(
          'Catergory already exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      const resData = await this.categoryService.update(id, updateCategoryDto);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to update category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('delete-sequlize/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const resData = await this.categoryService.remove(id);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to delete category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
