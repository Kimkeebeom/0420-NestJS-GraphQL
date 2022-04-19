import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-errors';
import { PrintErrorMessage } from 'src/utils/PrintErrorMessage';
import { Repository } from 'typeorm';
import { ICurrentUser } from '../auth/gql-user.param';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async fetchUser(id: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id: id } });
      if (!user) return new ApolloError('일치하는 유저정보가 없습니다.');
      console.log(user);
      return user;
    } catch (err: any) {
      console.log('fetchUser', err.message);
    }
  }

  async fetchUsers(page?: number, perPage?: number) {
    try {
      page = page ? page : 1;
      perPage = perPage ? perPage : 10;
      const startIdx = (page - 1) * perPage;
      const result: User[] = await this.userRepository
        .createQueryBuilder('user')
        .limit(perPage)
        .offset(startIdx)
        .getMany();
      return result;
    } catch (err: any) {
      PrintErrorMessage('fetchUsers', err.message);
      return null;
    }
  }

  async fetchAllUser() {
    try {
      return await this.userRepository.find();
    } catch (err: any) {
      PrintErrorMessage('fetchAllUsers', err.message);
      return null;
    }
  }

  async createUser(createUserInput: CreateUserInput) {
    return await this.userRepository.save({
      ...createUserInput,
    });
  }

  async updateUser(
    password: string,
    updateUserInput: UpdateUserInput,
    currentUser: ICurrentUser,
  ) {
    try {
      const target = await this.userRepository.findOne({
        where: { id: currentUser.id },
      });
      if (target.password !== password)
        return new ApolloError('비밀번호가 일치하지 않습니다.');
      const result = await this.userRepository.update(
        { id: target.id },
        { ...updateUserInput },
      );
      return result.affected > 0
        ? { ...target, ...updateUserInput }
        : new ApolloError('수정 실패');
    } catch (err: any) {
      PrintErrorMessage('updateUser', err.message);
    }
  }

  async deleteUser(password: string, currentUser: ICurrentUser) {
    try {
      const target = await this.userRepository.findOne({
        where: { id: currentUser.id },
      });
      if (target.password !== password)
        return new ApolloError('비밀번호가 일치하지 않습니다.');
      const result = await this.userRepository.softDelete({ id: target.id });
      return result.affected > 0;
    } catch (err: any) {
      PrintErrorMessage('deleteUser', err.message);
    }
  }
}
