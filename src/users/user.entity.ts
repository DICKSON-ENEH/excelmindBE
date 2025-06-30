import { Course } from 'src/course/course.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
// import { Course } from '../courses/course.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password?: string;

  @Column()
  name: string;

  @Column() 
  role: string;

  @OneToMany(() => Course, (course) => course.lecturer)
  courses: Course[];
 

@ManyToMany(() => Course, (course) => course.enrolledStudents)
enrolledCourses: Course[];
}

// 016df516-5ff3-443b-85bc-008e33c5ece4