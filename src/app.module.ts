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
      type: 'postgres',
      url: process.env.DATABASE_URL,

      entities: listEntities,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },

      // type: 'postgres',
      // host: 'localhost',
      // port: 5434,
      // username: 'postgres',
      // password: '1234',
      // database: 'postgres',
      // entities: listEntities,
      // synchronize: true,
    }),
    AuthModule,
    SpendModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
