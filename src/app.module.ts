import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './utils/types';


@Module({
  imports: [
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'dpg-d1govtili9vc73av48b0-a.oregon-postgres.render.com',
  port: 5432,
  username: 'excelminddb_user',
  password: 'cro9LVOZrG6u50NAu3Chs88eXvlQ9ibP',
  database: 'excelminddb',
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },

  },
  entities: [User],
  // entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: true, // or false in production
}),


    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
