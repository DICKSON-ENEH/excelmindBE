import { Course } from 'src/course/course.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Enrollment } from 'src/enrollment/enrollment.entity'; // <- make sure this is imported
import { Assignment } from 'src/assignment/assignment.entity';

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


@OneToMany(() => Assignment, (assignment) => assignment.student)
assignments: Assignment[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student) 
  enrollments: Enrollment[];
}
