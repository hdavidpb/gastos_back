import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { SpendModule } from './spend/spend.module';
import * as entities from './entities';

const listEntities = Object.values(entities);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // type: 'postgres',
      // url: process.env.DATABASE_URL,

      // entities: listEntities,
      // synchronize: true,
      // ssl: {
      //   rejectUnauthorized: false,
      // },

      type: 'postgres',
      host: 'ec2-44-205-63-142.compute-1.amazonaws.com',
      port: 5432,
      username: 'uhmadcrdbkxalz',
      password:
        '9c260cacf714b4465ee8fb9215eacf08665c3a1192ffd1413bb8ba6781a32a18',
      database: 'd3abtaikdvqkse',
      entities: listEntities,
      synchronize: true,
    }),
    AuthModule,
    SpendModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}

// type: 'postgres',
// host: 'localhost',
// port: 5434,
// username: 'postgres',
// password: '1234',
// database: 'postgres',
// entities: listEntities,
// synchronize: true,
