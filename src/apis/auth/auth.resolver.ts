import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';

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
}
