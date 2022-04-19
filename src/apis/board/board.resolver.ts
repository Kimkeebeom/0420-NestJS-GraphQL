import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/create-board.input';
import { UpdateBoardInput } from './dto/update-board.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from '../auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from '../auth/gql-user.param';

@Resolver(() => Board)
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Query(() => Board)
  fetchBoard(@Args('boardId', { type: () => ID }) boardId: string) {
    return this.boardService.fetchBoard(boardId);
  }

  @Query(() => [Board], { nullable: true })
  fetchBoards(
    @Args('page', { nullable: true }) page: number,
    @Args('perPage', { nullable: true }) perPage: number,
    @Args('search', { nullable: true }) search: string,
    @Args('startDate', { nullable: true }) startDate: Date,
    @Args('endDate', { nullable: true }) endDate: Date,
  ) {
    return this.boardService.fetchBoards(
      page,
      perPage,
      search,
      startDate,
      endDate,
    );
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [Board], { nullable: true })
  fetchMyBoards(
    @Args('page', { nullable: true }) page: number,
    @Args('perPage', { nullable: true }) perPage: number,
    @Args('search', { nullable: true }) search: string,
    @Args('startDate', { nullable: true }) startDate: Date,
    @Args('endDate', { nullable: true }) endDate: Date,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.boardService.fetchMyBoards(
      currentUser.id,
      page,
      perPage,
      search,
      startDate,
      endDate,
    );
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [Board], { nullable: true })
  fetchBoardsILiked(
    @Args('page', { nullable: true }) page: number,
    @Args('perPage', { nullable: true }) perPage: number,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.boardService.fetchBoardsILiked(currentUser.id, page, perPage);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Board)
  createBoard(
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.boardService.createBoard(createBoardInput, currentUser.id);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Board)
  updateBoard(
    @Args('boardId', { type: () => ID }) boardId: string,
    @Args('updateBoardInput') updateBoardInput: UpdateBoardInput,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.boardService.updateBoard(
      boardId,
      updateBoardInput,
      currentUser.id,
    );
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Board)
  deleteBoard(
    @Args('boardId', { type: () => ID }) boardId: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.boardService.deleteBoard(boardId, currentUser.id);
  }
}
