import { Profile } from "../entities/profiles.entity";
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(Profile)
export class profileRepository extends Repository<Profile> {}
