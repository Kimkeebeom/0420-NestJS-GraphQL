import { Module } from '@nestjs/common';
import { BoardLikeService } from './board-like.service';
import { BoardLikeResolver } from './board-like.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { BoardLike } from './entities/board-like.entity';
import { Board } from '../board/entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardLike, Board, User])],
  providers: [BoardLikeResolver, BoardLikeService],
})
export class BoardLikeModule {}
