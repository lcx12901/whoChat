import { Body, Controller, Inject, Post, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { Public } from '../auth/decorators/public.decorator';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    return this.userService.register(registerDTO);
  }

  @Public()
  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const authResult = await this.authService.checkUserLogin(loginDTO);
    return this.authService.certificate(authResult);
  }
}
