import { Field, ID, ObjectType } from '@nestjs/graphql';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'varchar', length: '255', nullable: true })
  @Field(() => String)
  email: string;

  @Column({ type: 'varchar', length: '255' })
  password: string;

  @Column({ type: 'varchar', length: '50' })
  @Field(() => String)
  name: string;

  @Column({ type: 'varchar', length: '255', nullable: true })
  @Field(() => String)
  picture: string;

  @DeleteDateColumn()
  deletdAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
