import { CreateBoardLikeInput } from './create-board-like.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBoardLikeInput extends PartialType(CreateBoardLikeInput) {
  @Field(() => Int)
  id: number;
}
