// import jwt from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

export function checkTokenExpired(token: any) {
  return token.exp > new Date().getTime() / 1000;
}
export function getAccessToken(id: string) {
  console.log(id);
  return jwt.sign({ id: id, permission: 0 }, 'f1BtnWgD3VKY', {
    algorithm: 'HS256',
    subject: 'accessToken',
    expiresIn: '1h',
  });
}
