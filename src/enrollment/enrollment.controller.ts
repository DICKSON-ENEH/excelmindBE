import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post(':courseId/enroll/:studentId')
  enroll(
    @Param('courseId') courseId: string,
    @Param('studentId') studentId: string,
  ) {
    return this.enrollmentService.enroll(courseId, studentId);
  }

  @Delete(':courseId/drop/:studentId')
  drop(
    @Param('courseId') courseId: string,
    @Param('studentId') studentId: string,
  ) {
    return this.enrollmentService.drop(courseId, studentId);
  }

  @Get('student/:studentId')
  getStudentEnrollments(@Param('studentId') studentId: string) {
    return this.enrollmentService.getStudentEnrollments(studentId);
  }

  @Post(':id/approve')
  approve(@Param('id') enrollmentId: string) {
    return this.enrollmentService.approve(enrollmentId);
  }

  @Post(':id/reject')
  reject(@Param('id') enrollmentId: string) {
    return this.enrollmentService.reject(enrollmentId);
  }
}

