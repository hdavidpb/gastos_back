import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Profile } from './profiles.entity';
import { Spend } from './spends.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Profile, (profile) => profile.id)
  profile: Profile;

  @OneToMany((type) => Spend, (spend) => spend.id)
  spend: Spend[];
}
