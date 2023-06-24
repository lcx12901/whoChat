import { BaseDto } from '@/common/entity/base.entity';
import { Entity, Column } from 'typeorm';

@Entity('user')
export class UserDto extends BaseDto {
  @Column({ name: 'user_name' })
  userName: string;

  @Column({ default: null })
  email: string;

  @Column()
  mobile: string;

  @Column({ default: 'profile.jpg' })
  avatar: string;

  // select: false 在查询中会进行隐藏
  @Column('text', { select: false })
  password: string;

  // 加密盐
  @Column('text', { select: false })
  salt: string;
}
