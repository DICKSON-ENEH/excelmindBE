import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './assignment.entity';
import { Repository } from 'typeorm';
import { Course } from 'src/course/course.entity';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment) private assignmentRepo: Repository<Assignment>,
    @InjectRepository(Course) private courseRepo: Repository<Course>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async submitAssignment(courseId: string, studentId: string, fileOrText: { file?: string; textSubmission?: string }) {
    const assignment = this.assignmentRepo.create({
      course: { id: courseId },
      student: { id: studentId },
      ...fileOrText,
    });
    return this.assignmentRepo.save(assignment);
  }

  async gradeAssignment(assignmentId: string, lecturerId: string, grade: number) {
    if (grade < 0 || grade > 100) throw new BadRequestException('Grade must be between 0 and 100');

    const assignment = await this.assignmentRepo.findOne({ where: { id: assignmentId }, relations: ['course'] });
    if (!assignment) throw new NotFoundException('Assignment not found');

    const course = await this.courseRepo.findOne({ where: { id: assignment.course.id }, relations: ['lecturer'] });
    if (!course || course.lecturer.id !== lecturerId) throw new ForbiddenException('Only the lecturer can grade');

    assignment.grade = grade;
    return this.assignmentRepo.save(assignment);
  }

  async calculateFinalGrade(courseId: string, studentId: string): Promise<number> {
    const assignments = await this.assignmentRepo.find({
      where: {
        course: { id: courseId },
        student: { id: studentId },
      },
    });

    const graded = assignments.filter((a) => a.grade !== null);
    if (graded.length === 0) return 0;

    const total = graded.reduce((sum, a) => sum + a.grade, 0);
    return total / graded.length;
  }
}
