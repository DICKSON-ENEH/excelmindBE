import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
export class CreateUserDto {
   @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string; 

  @Column()
  password: string;

  @Column()
  name: string;

  @Column() 
  role: string;
} 




 