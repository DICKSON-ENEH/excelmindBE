// enrollment.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './enrollment.entity';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { Course } from 'src/course/course.entity';
import { UserEntity } from 'src/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Enrollment, Course, UserEntity]), 
  ],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
  exports: [EnrollmentService], 
})
export class EnrollmentModule {}
 