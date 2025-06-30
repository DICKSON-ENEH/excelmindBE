import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;
  private useMock: boolean;

  constructor(private configService: ConfigService) {
    const openAIKEY = this.configService.get<string>('OPENAI');
    this.useMock = this.configService.get<string>('USE_MOCK_AI') === 'true';

    this.openai = new OpenAI({
      apiKey: openAIKEY,
    });
  }

  async recommendCourses(interests: string): Promise<{ recommendations: string[] }> {
    if (this.useMock) {
      return {
        recommendations: [
          `Intro to ${interests}`,
          `Foundations of ${interests}`,
          `Project-based ${interests} Bootcamp`,
        ],
      };
    }

    const prompt = `Suggest 3 beginner to intermediate-level courses for someone interested in ${interests}. Return them as a numbered list.`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.choices[0]?.message?.content || '';
    const recommendations = content
      .split('\n')
      .map(line => line.replace(/^\d+\.\s*/, '').trim())
      .filter(Boolean);

    return { recommendations };
  }

  async generateSyllabus(topic: string): Promise<{ syllabus: string }> {
    if (this.useMock) {
      return {
        syllabus: `Week 1: Introduction to ${topic}\nWeek 2: Core Concepts\nWeek 3: Advanced Topics\n...`,
      };
    }

    const prompt = `Create a 6-week syllabus for a course titled "${topic}". Include weekly topics and outcomes.`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    return {
      syllabus: response.choices[0]?.message?.content || 'No syllabus generated.',
    };
  }
}
 