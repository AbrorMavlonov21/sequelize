import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';

@Table({ tableName: 'products' })
export class ProductEntity extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id?: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  @ForeignKey(() => CategoryEntity)
  @Column({ type: DataType.INTEGER, allowNull: false, field: 'category_id' })
  categoryId: number;

  @BelongsTo(() => CategoryEntity)
  category: CategoryEntity;
}
