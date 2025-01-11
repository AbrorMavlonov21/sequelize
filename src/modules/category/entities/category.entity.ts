import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { ProductEntity } from 'src/modules/product/entities/product.entity';

@Table({ tableName: 'categories' })
export class CategoryEntity extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id?: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    field: 'Category_name',
    allowNull: false,
  })
  name: string;

  @HasMany(() => ProductEntity)
  products: ProductEntity[];
}
