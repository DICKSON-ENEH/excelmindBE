import { Controller, Post, Body, Put, Param , Get} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseDto } from './courses.dto';
import { Course } from './course.entity';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {} 

@Post('create')
async create(@Body() dto: CreateCourseDto): Promise<{ message: string }> {
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
 
@Get('lecturer/:id/courses')
async getLecturerCourses(@Param('id') lecturerId: string): Promise<Course[]> {
  return this.courseService.browseLecturerCourses(lecturerId);
}



}
