import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './utils/types';
import { CourseService } from './course/course.service';
import { CourseController } from './course/course.controller';
import { CourseModule } from './course/course.module';
import { Course } from './course/course.entity';
import { UserEntity } from './users/user.entity';
import { EnrollmentService } from './enrollment/enrollment.service';
import { EnrollmentController } from './enrollment/enrollment.controller';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { Enrollment } from './enrollment/enrollment.entity';
import { AssignmentService } from './assignment/assignment.service';
import { AssignmentController } from './assignment/assignment.controller';
import { AssignmentModule } from './assignment/assignment.module';
import { Assignment } from './assignment/assignment.entity';
import { AiController } from './ai/ai.controller';
import { AiService } from './ai/ai.service';
import { AiModule } from './ai/ai.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
      entities: [Course, UserEntity, Enrollment, Assignment],
      synchronize: true,
    }),
    UsersModule,
    CourseModule,
    EnrollmentModule,
    AssignmentModule,
    AiModule,
  ],
  controllers: [AppController], 
  providers: [AppService],      
})
export class AppModule {}

 
// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//     host: 'dpg-d1govtili9vc73av48b0-a.oregon-postgres.render.com',
//   port: 5432,
//   username: 'excelminddb_user',
//   password: 'cro9LVOZrG6u50NAu3Chs88eXvlQ9ibP',
//   database: 'excelminddb',
//   ssl: true,
//   extra: {
//     ssl: {
//       rejectUnauthorized: false,
//     },

//   },
//   entities: [User, Course],
//     }),
//     UsersModule,
//     CourseModule,
//   ],
//   controllers: [AppController], 
//   providers: [AppService],      
// })