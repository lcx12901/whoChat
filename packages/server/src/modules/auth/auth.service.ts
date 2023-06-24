import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { UserDto } from '@/modules/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from '@/utils/cryptogram';
import { UserService } from '@/modules/user/user.service';
import { LoginDTO } from '../user/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 校验用户登录信息
   */
  async checkUserLogin(loginDTO: LoginDTO) {
    const { mobile, password } = loginDTO;
    const user = await this.userService.findUserByMobile(mobile);
    if (!user) throw new NotFoundException('用户不存在');
    const { password: dbPassword, salt } = user;
    const currentPassword = encryptPassword(password, salt);
    if (currentPassword !== dbPassword)
      throw new BadRequestException('密码错误');
    return user;
  }

  /**
   * 生成token
   */
  async certificate(user: UserDto) {
    const payload = {
      id: user.id,
      userName: user.userName,
      mobile: user.mobile,
    };
    const token = this.jwtService.sign(payload);
    return token;
  }
}
