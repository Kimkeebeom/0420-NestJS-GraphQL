import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Board } from 'src/apis/board/entities/board.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class BoardLike {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { description: 'Id' })
  id: string;

  @ManyToOne(() => User, { eager: true })
  @Field(() => User, { description: '유저' })
  user: User;

  @ManyToOne(() => Board, { eager: true })
  @Field(() => Board, { description: 'like 대상 boardId' })
  target: Board;
}
