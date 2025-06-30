import { UserEntity } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Enrollment } from 'src/enrollment/enrollment.entity'; // <-- import this!
import { Assignment } from 'src/assignment/assignment.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  credits: number;

  @Column({ nullable: true })
  syllabus: string;

  @ManyToOne(() => UserEntity, (user) => user.courses)
  lecturer: UserEntity;
 @OneToMany(() => Assignment, (assignment) => assignment.course)
assignments: Assignment[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[]; // <-- Add this line!
}
