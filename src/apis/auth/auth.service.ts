import { Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-errors';
import { PrintErrorMessage } from 'src/utils/PrintErrorMessage';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/apis/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  setRefreshToken(user: User, res) {
    const refreshToken = this.jwtService.sign(
      { id: user.id, email: user.email, permission: 0 },
      {
        secret: 'f1BtnWgD3VKY',
        algorithm: 'HS256',
        subject: 'accessToken',
        expiresIn: '2w',
      },
    );
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader(
      'Set-Cookie',
      `refreshToken=${refreshToken} //path=/; SameSite=None; httpOnly;; `,
    );
  }

  getAccessToken(user: User) {
    return this.jwtService.sign(
      { id: user.id, email: user.email, permission: 0 },
      {
        secret: 'f1BtnWgD3VKY',
        algorithm: 'HS256',
        subject: 'accessToken',
        expiresIn: '2h',
      },
    );
  }

  async loginUser(email: string, password: string, res) {
    try {
      const user = await this.userRepository.findOne({
        where: { email, password },
      });
      if (!user) return new ApolloError('일치하는 유저정보가 없습니다.');
      this.setRefreshToken(user, res);
      return this.getAccessToken(user);
    } catch (err: any) {
      PrintErrorMessage('loginUser', err.message);
    }
  }
}
