import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String, { nullable: true, description: '유저 E-Mail' })
  email: string;
  @Field(() => String, { nullable: true, description: '비밀번호' })
  name: string;
  @Field(() => String, { nullable: true, description: '유저 이름' })
  picture: string;
}
