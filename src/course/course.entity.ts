import {  UserEntity } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable } from 'typeorm';


export enum CourseStatus {
  APPROVED = 'approved',
  DECLINED = 'declined',
  PENDING = 'pending', 
}

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

    @Column({
    type: 'enum',
    enum: CourseStatus,
    default: CourseStatus.PENDING, 
  })

 



@JoinTable()
enrolledStudents: UserEntity[];

@ManyToOne(() => UserEntity, (user) => user.courses)
lecturer: UserEntity;

@Column({
  type: 'enum',
  enum: CourseStatus,
  default: CourseStatus.PENDING,
})
status: CourseStatus;
}
