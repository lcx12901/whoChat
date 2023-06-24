import { Module, forwardRef } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          global: true,
          signOptions: { expiresIn: '60s' },
        };
      },
      inject: [ConfigService],
    }),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
