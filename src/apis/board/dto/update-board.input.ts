import { CreateBoardInput } from './create-board.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBoardInput extends PartialType(CreateBoardInput) {
  @Field(() => String, { description: '글 제목', nullable: true })
  title?: string;
  @Field(() => String, { description: '글 내용', nullable: true })
  contents?: string;
}
