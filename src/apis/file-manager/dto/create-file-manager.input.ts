import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFileManagerInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
