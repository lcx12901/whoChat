import { regMobileCN } from '@/utils/regex.util';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class RegisterDTO {
  @ApiProperty({
    description: '手机号，唯一',
    example: '13049153466',
  })
  @Matches(regMobileCN, { message: '请输入正确手机号' })
  @IsNotEmpty({ message: '请输入手机号' })
  readonly mobile: string;

  @ApiProperty({
    description: '用户名',
    example: '斯提芬大狗',
  })
  @IsNotEmpty({ message: '请输入用户昵称' })
  @IsString({ message: '名字必须是 String 类型' })
  readonly userName: string;

  @ApiProperty({
    description: '密码',
    example: '123456',
  })
  @IsNotEmpty({ message: '请输入密码' })
  readonly password: string;
}
