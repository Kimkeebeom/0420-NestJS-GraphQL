import { Module } from '@nestjs/common';
import { BoardLikeService } from './board-like.service';
import { BoardLikeResolver } from './board-like.resolver';

@Module({
  providers: [BoardLikeResolver, BoardLikeService]
})
export class BoardLikeModule {}
