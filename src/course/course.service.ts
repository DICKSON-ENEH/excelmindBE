import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course, CourseStatus } from './course.entity';
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

  async createCourse(dto: CreateCourseDto): Promise<Course> {
    const lecturer = await this.userRepo.findOne({ where: { id: dto.lecturerId } });
    if (!lecturer) throw new NotFoundException('Lecturer not found');

    const course = this.courseRepo.create({
      ...dto,
      lecturer,
    });
    return this.courseRepo.save(course);
  }

  async updateCourse(courseId: string, dto: UpdateCourseDto): Promise<Course> {
    const course = await this.courseRepo.findOne({ where: { id: courseId } });
    if (!course) throw new NotFoundException('Course not found');

    Object.assign(course, dto);
    return this.courseRepo.save(course);
  }


  // Students
async browseCourses(): Promise<Course[]> {
  return this.courseRepo.find({ relations: ['lecturer'] });
}

async enroll(courseId: string, studentId: string): Promise<Course> {
  const course = await this.courseRepo.findOne({ where: { id: courseId }, relations: ['enrolledStudents'] });
  const student = await this.userRepo.findOne({ where: { id: studentId } });
  if (!course || !student) throw new NotFoundException('Course or student not found');
  course.enrolledStudents.push(student);
  return this.courseRepo.save(course);
}

async drop(courseId: string, studentId: string): Promise<Course> {
  const course = await this.courseRepo.findOne({ where: { id: courseId }, relations: ['enrolledStudents'] });
  if (!course) throw new NotFoundException('Course not found');
  course.enrolledStudents = course.enrolledStudents.filter(s => s.id !== studentId);
  return this.courseRepo.save(course);
}

// Admins
async approveEnrollment(courseId: string): Promise<Course> {
  const course = await this.courseRepo.findOne({ where: { id: courseId } });
  if (!course) throw new NotFoundException('Course not found');
  course.status = CourseStatus.APPROVED;
  return this.courseRepo.save(course);
}

async rejectEnrollment(courseId: string): Promise<Course> {
  const course = await this.courseRepo.findOne({ where: { id: courseId } });
  if (!course) throw new NotFoundException('Course not found');
  course.status = CourseStatus.DECLINED;
  return this.courseRepo.save(course);
}

async assignLecturer(courseId: string, lecturerId: string): Promise<Course> {
  const course = await this.courseRepo.findOne({ where: { id: courseId } });
  const lecturer = await this.userRepo.findOne({ where: { id: lecturerId } });
  if (!course || !lecturer) throw new NotFoundException('Course or lecturer not found');
  course.lecturer = lecturer;
  return this.courseRepo.save(course);
}

}
