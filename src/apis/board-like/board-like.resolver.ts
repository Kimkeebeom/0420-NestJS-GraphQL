import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BoardLikeService } from './board-like.service';
import { BoardLike } from './entities/board-like.entity';
import { CreateBoardLikeInput } from './dto/create-board-like.input';
import { UpdateBoardLikeInput } from './dto/update-board-like.input';

@Resolver(() => BoardLike)
export class BoardLikeResolver {
  constructor(private readonly boardLikeService: BoardLikeService) {}

  @Mutation(() => BoardLike)
  createBoardLike(@Args('createBoardLikeInput') createBoardLikeInput: CreateBoardLikeInput) {
    return this.boardLikeService.create(createBoardLikeInput);
  }

  @Query(() => [BoardLike], { name: 'boardLike' })
  findAll() {
    return this.boardLikeService.findAll();
  }

  @Query(() => BoardLike, { name: 'boardLike' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.boardLikeService.findOne(id);
  }

  @Mutation(() => BoardLike)
  updateBoardLike(@Args('updateBoardLikeInput') updateBoardLikeInput: UpdateBoardLikeInput) {
    return this.boardLikeService.update(updateBoardLikeInput.id, updateBoardLikeInput);
  }

  @Mutation(() => BoardLike)
  removeBoardLike(@Args('id', { type: () => Int }) id: number) {
    return this.boardLikeService.remove(id);
  }
}
