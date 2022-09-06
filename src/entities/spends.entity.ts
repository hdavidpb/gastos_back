import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { User } from './users.entity';

@Entity()
export class Spend {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: number;

  @Column()
  year: number;

  @Column()
  monthNumber: number;

  @Column()
  fullDate: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
