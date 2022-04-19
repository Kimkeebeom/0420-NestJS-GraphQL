import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from '../auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from '../auth/gql-user.param';
import { BoardLikeService } from './board-like.service';
import { BoardLike } from './entities/board-like.entity';

@Resolver(() => BoardLike)
export class BoardLikeResolver {
  constructor(private readonly boardLikeService: BoardLikeService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  toggleBoardLike(
    @Args('targetId') targetId: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.boardLikeService.toggleBoardLike(targetId, currentUser.id);
  }
}
