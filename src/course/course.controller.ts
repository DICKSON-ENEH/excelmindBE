import { Controller, Post, Body, Put, Param , Get} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseDto } from './courses.dto';
import { Course } from './course.entity';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {} 

  @Post('create')
  async create(@Body() dto: CreateCourseDto): Promise<Course> {
    return this.courseService.createCourse(dto);
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateCourseDto): Promise<Course> {
    return this.courseService.updateCourse(id, dto);
  }

  @Get('browse')
browseCourses(): Promise<Course[]> {
  return this.courseService.browseCourses();
}

@Post(':id/enroll/:studentId')
enroll(@Param('id') courseId: string, @Param('studentId') studentId: string): Promise<Course> {
  return this.courseService.enroll(courseId, studentId);
}

@Post(':id/drop/:studentId')
drop(@Param('id') courseId: string, @Param('studentId') studentId: string): Promise<Course> {
  return this.courseService.drop(courseId, studentId);
}

// Admin actions
@Post(':id/approve')
approve(@Param('id') courseId: string): Promise<Course> {
  return this.courseService.approveEnrollment(courseId);
}

@Post(':id/reject')
reject(@Param('id') courseId: string): Promise<Course> {
  return this.courseService.rejectEnrollment(courseId);
}

@Post(':id/assign/:lecturerId')
assignLecturer(
  @Param('id') courseId: string,
  @Param('lecturerId') lecturerId: string,
): Promise<Course> {
  return this.courseService.assignLecturer(courseId, lecturerId);
}

}
