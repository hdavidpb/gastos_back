import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpendRepository } from 'src/repositories/spend.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { SpendController } from './spend.controller';
import { SpendService } from './spend.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, SpendRepository])],
  controllers: [SpendController],
  providers: [SpendService],
})
export class SpendModule {}
