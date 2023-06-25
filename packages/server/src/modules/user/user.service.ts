import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDTO } from './dto/register.dto';
import { UserDto } from './entities/user.entity';
import { encryptPassword, makeSalt } from '@/utils/cryptogram';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserDto)
    private readonly userRepository: Repository<UserDto>,
  ) {}

  /**
   * 校验用户注册信息
   */
  async checkRegister(registerDTO: RegisterDTO): Promise<any> {
    const { mobile } = registerDTO;
    // 检查手机号是否唯一
    const hasMobile = await this.userRepository
      .createQueryBuilder('user')
      .where('user.mobile = :mobile', { mobile })
      .getOne();
    if (hasMobile) {
      throw new BadRequestException('手机号已存在');
    }
  }

  /**
   * 用户注册
   */
  async register(registerDTO: RegisterDTO): Promise<any> {
    await this.checkRegister(registerDTO);

    const { mobile, userName, password } = registerDTO;
    // 制作密码盐
    const salt = makeSalt();
    // 加密密码
    const saltPassword = encryptPassword(password, salt);
    const newUser: UserDto = new UserDto();

    const result = await this.userRepository.save(
      Object.assign(newUser, {
        userName,
        password: saltPassword,
        salt,
        mobile,
      }),
    );
    return result;
  }

  /**
   * 手机号查找用户
   */
  async findUserByMobile(mobile: string): Promise<any> {
    return await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .addSelect('user.salt')
      .where('user.mobile = :mobile', { mobile })
      .getOne();
  }
}
