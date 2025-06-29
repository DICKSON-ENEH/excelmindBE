import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './user.entity';
import { User } from 'src/utils/types';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService, 
  ) {}

async createUser(payload: UserEntity): Promise<{ message: string; data: Partial<UserEntity> }> {
  const existingUser = await this.userRepository.findOne({ where: { email: payload.email } });

  if (existingUser) {
    throw new ConflictException('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const newUser = this.userRepository.create({
    ...payload,
    password: hashedPassword,
  });

  const savedUser = await this.userRepository.save(newUser);

  return {
    message: 'User created successfully',
    data: {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role,
    },
  };
}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

async login(email: string, password: string): Promise<{ message: string; data: Partial<UserEntity>; token: string }> {
  const user = await this.findByEmail(email);
  if (!user) throw new UnauthorizedException('Invalid credentials');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

  const payload = { sub: user.id, email: user.email, role: user.role };
  const token = this.jwtService.sign(payload);

  const { password: _, ...userWithoutPassword } = user;

  return {
    message: 'Login successful',
    data: userWithoutPassword,
    token,
  };
}



}

