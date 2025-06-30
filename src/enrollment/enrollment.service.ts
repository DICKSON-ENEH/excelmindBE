import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Enrollment, EnrollmentStatus } from './enrollment.entity';
import { Course } from 'src/course/course.entity';
import { UserEntity } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepo: Repository<Enrollment>,

    @InjectRepository(Course)
    private courseRepo: Repository<Course>,

    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async enroll(courseId: string, studentId: string): Promise<{ message: string }> {
    const course = await this.courseRepo.findOne({ where: { id: courseId } });
    const student = await this.userRepo.findOne({ where: { id: studentId } });

    if (!course || !student) throw new NotFoundException('Course or student not found');

    const exists = await this.enrollmentRepo.findOne({ where: { course, student } });
    if (exists) throw new ConflictException('You already applied for this course');

    const enrollment = this.enrollmentRepo.create({ course, student });
    await this.enrollmentRepo.save(enrollment);

    return { message: 'Enrollment request sent' };
  }

  async drop(courseId: string, studentId: string): Promise<{ message: string }> {
    const enrollment = await this.enrollmentRepo.findOne({
      where: {
        course: { id: courseId },
        student: { id: studentId },
      },
    });

    if (!enrollment) throw new NotFoundException('Enrollment not found');
    await this.enrollmentRepo.remove(enrollment);

    return { message: 'Enrollment dropped' };
  }

  async getStudentEnrollments(studentId: string): Promise<Enrollment[]> {
    return this.enrollmentRepo.find({
      where: { student: { id: studentId } },
      relations: ['course', 'course.lecturer'],
    });
  }

  async getAllEnrollments(): Promise<Enrollment[]> {
  return this.enrollmentRepo.find({
    relations: ['student', 'course', 'course.lecturer'],
  });
}


async approve(enrollmentId: string, userId: string): Promise<{ message: string }> {
  const user = await this.userRepo.findOne({ where: { id: userId } });
  if (!user) throw new NotFoundException('User not found');
  if (user.role !== 'admin') throw new ForbiddenException('Access denied: Admins only');

  const enrollment = await this.enrollmentRepo.findOne({ where: { id: enrollmentId } });
  if (!enrollment) throw new NotFoundException('Enrollment not found');

  enrollment.status = EnrollmentStatus.APPROVED;
  await this.enrollmentRepo.save(enrollment);

  return { message: 'Enrollment approved' };
} 

async reject(enrollmentId: string, userId: string): Promise<{ message: string }> {
  const user = await this.userRepo.findOne({ where: { id: userId } });
  if (!user) throw new NotFoundException('User not found');
  if (user.role !== 'admin') throw new ForbiddenException('Access denied: Admins only');

  const enrollment = await this.enrollmentRepo.findOne({ where: { id: enrollmentId } });
  if (!enrollment) throw new NotFoundException('Enrollment not found');

  enrollment.status = EnrollmentStatus.REJECTED;
  await this.enrollmentRepo.save(enrollment);

  return { message: 'Enrollment rejected' };
}

}
