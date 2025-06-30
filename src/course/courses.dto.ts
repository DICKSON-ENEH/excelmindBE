import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString , IsUUID} from 'class-validator';
// import { CourseStatus } from './course.entity';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  credits: number;

  @IsOptional()
  @IsString()
  syllabus?: string;

  @IsOptional()
 

  @IsString()
  lecturerId: string;
}

export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  credits?: number;

  @IsOptional()
  @IsString()
  syllabus?: string;


  @IsOptional()
  @IsUUID() // or @IsInt() if you're using integer IDs
  lecturerId?: string;
}
