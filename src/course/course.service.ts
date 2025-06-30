import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto, UpdateCourseDto } from './courses.dto';
import { UserEntity } from 'src/users/user.entity'; // actual entity, not DTO

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,

    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>
  ) {}

async createCourse(dto: CreateCourseDto): Promise<{ message: string }> {
  const lecturer = await this.userRepo.findOne({ where: { id: dto.lecturerId } });
  if (!lecturer) throw new NotFoundException('Lecturer not found');

  const course = this.courseRepo.create({
    ...dto,
    lecturer,
  });

  await this.courseRepo.save(course);

  return {
    message: 'Course created successfully',
  };
}



async updateCourse(courseId: string, dto: UpdateCourseDto): Promise<Course> {
  const course = await this.courseRepo.findOne({ where: { id: courseId }, relations: ['lecturer'] });
  if (!course) throw new NotFoundException('Course not found');

  if (dto.lecturerId) {
    const lecturer = await this.userRepo.findOne({ where: { id: dto.lecturerId } });
    if (!lecturer) throw new NotFoundException('Lecturer not found');
    course.lecturer = lecturer;
  }


  Object.assign(course, {
    ...dto,
    lecturer: course.lecturer, 
  });

  return this.courseRepo.save(course);
}



async browseCourses(): Promise<Course[]> {
  return this.courseRepo.find({ relations: ['lecturer'] });
}


async browseLecturerCourses(lecturerId: string): Promise<Course[]> {
  return this.courseRepo.find({
    where: { lecturer: { id: lecturerId } },
    relations: ['lecturer'],
  });
}






}
