import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Course } from './course.entity';
import { UserEntity } from 'src/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, UserEntity]) 
  ],
  providers: [CourseService],
  controllers: [CourseController],
  exports: [CourseService], 
})
export class CourseModule {}
