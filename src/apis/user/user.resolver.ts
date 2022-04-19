import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/apis/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/apis/auth/gql-user.param';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  fetchUser(@Args('id', { type: () => ID }) id: string) {
    return this.userService.fetchUser(id);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  fetchLoggedInUser(@CurrentUser() currentUser: ICurrentUser) {
    return this.userService.fetchUser(currentUser.id);
  }

  @Query(() => [User], { nullable: true })
  fetchUsers(
    @Args('page', { type: () => Int, nullable: true })
    page?: number,
    @Args('perPage', { type: () => Int, nullable: true })
    perPage?: number,
  ) {
    return this.userService.fetchUsers(page, perPage);
  }

  @Query(() => User, { nullable: true })
  fetchAllUser() {
    return this.userService.fetchAllUser();
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => User)
  updateUser(
    @Args('password', { type: () => ID }) password: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.userService.updateUser(password, updateUserInput, currentUser);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteUser(
    @Args('password', { type: () => ID }) password: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.userService.deleteUser(password, currentUser);
  }
}
