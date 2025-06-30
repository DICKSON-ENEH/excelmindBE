import { Controller, Post, Patch, Get, Param, Body } from '@nestjs/common';
import { AssignmentService } from './assignment.service';

@Controller('assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Post(':courseId/:studentId/submit')
  submitAssignment(
    @Param('courseId') courseId: string,
    @Param('studentId') studentId: string,
    @Body() body: { file?: string; textSubmission?: string },
  ) {
    return this.assignmentService.submitAssignment(courseId, studentId, body);
  }

  @Patch(':id/grade')
  gradeAssignment(
    @Param('id') id: string,
    @Body() body: { grade: number; lecturerId: string },
  ) {
    return this.assignmentService.gradeAssignment(id, body.lecturerId, body.grade);
  }

  @Get(':courseId/:studentId/grade')
  getFinalGrade(@Param('courseId') courseId: string, @Param('studentId') studentId: string) {
    return this.assignmentService.calculateFinalGrade(courseId, studentId);
  }
}
