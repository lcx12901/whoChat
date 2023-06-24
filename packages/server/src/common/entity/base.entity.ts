import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

export abstract class BaseDto {
  // 主键id
  @PrimaryGeneratedColumn()
  id: number;

  // 创建时间
  @CreateDateColumn({ name: 'create_time', type: 'timestamp' })
  createTime: Date;

  // 更新时间
  @UpdateDateColumn({ name: 'update_time', type: 'timestamp' })
  updateTime: Date;
}
