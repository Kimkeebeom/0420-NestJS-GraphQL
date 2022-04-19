import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-errors';
import { Repository } from 'typeorm';
import { Board } from '../board/entities/board.entity';
import { User } from '../user/entities/user.entity';
import { BoardLike } from './entities/board-like.entity';

@Injectable()
export class BoardLikeService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(BoardLike)
    private readonly boardLikeRepository: Repository<BoardLike>,
  ) {}
  async toggleBoardLike(targetId: string, userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) return new ApolloError('유저 정보 조회 오류');
    const target = await this.boardRepository.findOne({
      where: { id: targetId },
    });
    if (!target) return new ApolloError('게시글 정보 조회 오류');

    const prevState = await this.boardLikeRepository
      .createQueryBuilder('board_like')
      .where(`board_like.user = :userId`, { userId })
      .where(`board_like.target = :targetId`, { targetId })
      .getOne();
    console.log(prevState);
    if (prevState) {
      await this.boardLikeRepository.delete({ id: prevState.id });
      return false;
    }
    await this.boardLikeRepository.save({ target: target, user: user });
    return true;
  }
}
