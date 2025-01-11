import { Role } from 'role/role.enum';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class UserEntity extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id?: number;

  @Column({ type: DataType.STRING, field: 'full_name', allowNull: true })
  fullname?: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  login: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
    defaultValue: [Role.User],
  })
  roles?: string[];
}
