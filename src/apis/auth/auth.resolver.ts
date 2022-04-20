import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { GqlAuthRefreshGuard } from './gql-auth.guard';
import { CurrentUser, ICurrentUser } from './gql-user.param';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  loginUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context,
  ) {
    return this.authService.loginUser(email, password, context.res);
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  async restoreAccessToken(@CurrentUser() currentUser: ICurrentUser) {
    return this.authService.restoreAccessToken(currentUser.id);
  }
}
