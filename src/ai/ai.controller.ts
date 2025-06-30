import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('recommend')
  async recommendCourses(@Body() body: { interests: string }): Promise<any> {
    return this.aiService.recommendCourses(body.interests);
  }

  @Post('syllabus')
  async generateSyllabus(@Body() body: { topic: string }): Promise<any> {
    return this.aiService.generateSyllabus(body.topic);
  }
}
