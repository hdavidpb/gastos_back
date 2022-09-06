import { Spend } from 'src/entities';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(Spend)
export class SpendRepository extends Repository<Spend> {}
