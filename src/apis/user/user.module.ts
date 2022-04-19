import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { jwtAccessStrategy } from 'src/apis/auth/strategy/jwt-access.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserResolver, UserService, jwtAccessStrategy],
})
export class UserModule {}
