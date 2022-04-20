import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-errors';
import { getDBDateStringByDate } from 'src/utils/GetDBDateStringByDate';
import { In, Repository } from 'typeorm';
import { BoardLike } from '../board-like/entities/board-like.entity';
import { User } from '../user/entities/user.entity';
import { CreateBoardInput } from './dto/create-board.input';
import { UpdateBoardInput } from './dto/update-board.input';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(BoardLike)
    private readonly boardLikeRepository: Repository<BoardLike>,
  ) {}
  async fetchBoard(boardId: string) {
    return await this.boardRepository.findOne({ where: { id: boardId } });
  }

  async fetchBoards(
    page?: number,
    perPage?: number,
    search?: string,
    startDate?: Date,
    endDate?: Date,
  ) {
    page = page ? page : 1;
    perPage = perPage ? perPage : 10;
    const startIdx = (page - 1) * perPage;
    const result = await this.boardRepository
      .createQueryBuilder('board')
      .where(search ? `board.title LIKE '%'||:search||'%'` : '1 = 1', {
        search: search,
      })
      .leftJoinAndSelect('board.user', 'user')
      .andWhere(
        startDate
          ? `board.createdAt > TO_DATE(:startDate,'YYYYMMDD')`
          : '1 = 1',
        {
          startDate: getDBDateStringByDate(startDate),
        },
      )
      .andWhere(
        endDate
          ? `board.createdAt < TO_DATE(:endDate,'YYYYMMDD') + integer'1'`
          : '1 = 1',
        { endDate: getDBDateStringByDate(endDate) },
      )
      .andWhere('board.deletedAt IS NULL')
      .limit(perPage)
      .offset(startIdx)
      .getMany();
    return result;
  }

  async fetchMyBoards(
    userId: string,
    page?: number,
    perPage?: number,
    search?: string,
    startDate?: Date,
    endDate?: Date,
  ) {
    page = page ? page : 1;
    perPage = perPage ? perPage : 10;
    const startIdx = (page - 1) * perPage;
    const result = await this.boardRepository
      .createQueryBuilder('board')
      .where(search ? `board.title LIKE '%'||:search||'%'` : '1 = 1', {
        search: search,
      })
      .leftJoinAndSelect('board.user', 'user')
      .andWhere(
        startDate
          ? `board.createdAt > TO_DATE(:startDate,'YYYYMMDD')`
          : '1 = 1',
        {
          startDate: getDBDateStringByDate(startDate),
        },
      )
      .andWhere(
        endDate
          ? `board.createdAt < TO_DATE(,'YYYYMMDD') + integer'1'`
          : '1 = 1',
        { endDate: getDBDateStringByDate(endDate) },
      )
      .andWhere('board.user = :userId', { userId: userId })
      .andWhere('board.deletedAt IS NULL')
      .limit(perPage)
      .offset(startIdx)
      .getMany();
    return result;
  }

  async fetchBoardsILiked(userId: string, page?: number, perPage?: number) {
    page = page ? page : 1;
    perPage = perPage ? perPage : 10;
    const startIdx = (page - 1) * perPage;

    const result = await this.boardLikeRepository
      .createQueryBuilder('board_like')
      .leftJoinAndSelect('board_like.target', 'board')
      .where('board_like.user = :userId', { userId })
      .andWhere('board.deletedAt IS NULL')
      .limit(perPage)
      .offset(startIdx)
      .getMany();

    return result.map((el) => {
      const { target } = el;
      return target;
    });

    // return result.map((boardLike) => boardLike.target);
  }

  async createBoard(createBoardInput: CreateBoardInput, userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) return new ApolloError('유저 정보 오류');
    const result = await this.boardRepository.save({
      ...createBoardInput,
      user,
    });

    return result;
  }

  async updateBoard(
    boardId: string,
    updateBoardInput: UpdateBoardInput,
    userId: string,
  ) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) return new ApolloError('유저 정보 오류');
    const target = await this.boardRepository.findOne({
      where: { id: boardId },
    });
    if (target.user.id !== user.id) return new ApolloError('권한이 없습니다.');
    const result = await this.boardRepository.update(
      { id: boardId },
      { ...updateBoardInput },
    );
    return result.affected > 0
      ? { ...target, ...updateBoardInput }
      : new ApolloError('수정 실패');
  }

  async deleteBoard(boardId: string, userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) return new ApolloError('유저 정보 오류');
    const target = await this.boardRepository.findOne({
      where: { id: boardId },
    });
    if (target.user.id !== user.id) return new ApolloError('권한이 없습니다.');
    const result = await this.boardRepository.softDelete(target);
    return result.affected > 0;
  }
}
