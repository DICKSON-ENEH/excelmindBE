import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './assignment.entity';
import { Course } from 'src/course/course.entity';
import { UserEntity } from 'src/users/user.entity';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Assignment, Course, UserEntity]), 
  ],
  providers: [AssignmentService],
  controllers: [AssignmentController],
  exports: [AssignmentService], 
})
export class AssignmentModule {}
