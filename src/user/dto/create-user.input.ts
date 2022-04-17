import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: '유저 E-Mail' })
  email: string;
  @Field(() => String, { description: '비밀번호' })
  password: string;
  @Field(() => String, { description: '유저 이름' })
  name: string;
}
