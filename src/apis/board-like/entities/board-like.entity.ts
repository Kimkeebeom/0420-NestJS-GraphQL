import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class BoardLike {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
