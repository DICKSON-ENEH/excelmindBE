import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from 'src/users/user.entity';
import { Course } from 'src/course/course.entity';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Course, (course) => course.assignments, { eager: true })
  course: Course;

  @ManyToOne(() => UserEntity, (user) => user.assignments, { eager: true })
  student: UserEntity;

  @Column({ nullable: true })
  file: string; 

  @Column({ type: 'text', nullable: true })
  textSubmission: string; 

  @Column({ type: 'float', nullable: true })
  grade: number; 
}
