import { Course } from 'src/course/course.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Enrollment } from 'src/enrollment/enrollment.entity'; // <- make sure this is imported

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



  @OneToMany(() => Enrollment, (enrollment) => enrollment.student) // <-- add this
  enrollments: Enrollment[];
}
