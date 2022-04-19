import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBoardInput {
  @Field(() => String, { description: '글 제목' })
  title: string;
  @Field(() => String, { description: '글 내용' })
  contents: string;
}
