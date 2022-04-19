import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardResolver } from './board.resolver';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { BoardLike } from '../board-like/entities/board-like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, User, BoardLike])],
  providers: [BoardResolver, BoardService],
})
export class BoardModule {}
