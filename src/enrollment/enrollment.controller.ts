import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { Role } from 'src/roles/roles.decorator';
import { JwtAuthGuard } from 'src/users/jwt.guard';
import { RolesGuard } from 'src/roles/roles.guard';
@Controller('enrollments')
@UseGuards(JwtAuthGuard, RolesGuard)
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
@Get('all-enrollments')
getAll() {
  return this.enrollmentService.getAllEnrollments();
}

@Post(':enrollmentId/approve/:userId')
approve(
  @Param('enrollmentId') enrollmentId: string,
  @Param('userId') userId: string,
) {
  return this.enrollmentService.approve(enrollmentId, userId);
}

@Post(':enrollmentId/reject/:userId')
reject(
  @Param('enrollmentId') enrollmentId: string,
  @Param('userId') userId: string,
) {
  return this.enrollmentService.reject(enrollmentId, userId);
}

}

