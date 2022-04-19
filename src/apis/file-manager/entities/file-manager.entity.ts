import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class FileManager {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
