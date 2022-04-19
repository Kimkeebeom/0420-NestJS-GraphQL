import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class jwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        console.log(req.headers);
        const cookies = req.headers.cookies;
        return cookies.replace('refreshToken=', '');
      },
      passReqToCallback: true,
      secretOrKey: 'f1BtnWgD3VKY',
    });
  }

  async validate(req, payload) {
    // const refreshToken = req.headers.cookie.replace('refreshToken=', '');
    // const check = await this.cacheManager.get(`refreshToken:${refreshToken}`);
    // if (check) throw new UnauthorizedException('이미 로그아웃 되었습니다.');
    if (payload.exp > new Date().getTime() / 1000)
      throw new UnauthorizedException('만료된 토큰입니다.');
    return {
      id: payload.id,
      email: payload.email,
      sub: payload.sub,
      exp: payload.exp,
    };
  }
}
