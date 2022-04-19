import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/apis/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/apis/user/user.service';
import { jwtRefreshStrategy } from './strategy/jwt-refresh.strategy';
import { jwtAccessStrategy } from './strategy/jwt-access.strategy';

@Module({
  imports: [
    JwtModule.register({
      signOptions: { algorithm: 'HS256' },
      secret: 'f1BtnWgD3VKY',
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    AuthResolver,
    AuthService,
    UserService,
    jwtAccessStrategy,
    jwtRefreshStrategy,
  ],
})
export class AuthModule {}
