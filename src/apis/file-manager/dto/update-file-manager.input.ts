import { CreateFileManagerInput } from './create-file-manager.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFileManagerInput extends PartialType(CreateFileManagerInput) {
  @Field(() => Int)
  id: number;
}
