import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './userDto';
import { User } from 'src/utils/types';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService, 
  ) {}

async createUser(payload: CreateUserDto): Promise<{ message: string; data: User }> {
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const newUser = this.userRepository.create({
    ...payload,
    password: hashedPassword,
  });
  const savedUser = await this.userRepository.save(newUser);

  // Optionally remove password before returning
  delete savedUser.password;

  return {
    message: 'User created successfully',
    data: savedUser,
  };
}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

async login(email: string, password: string): Promise<{ message: string; data: User; token: string }> {
  const user = await this.findByEmail(email);
  if (!user) throw new UnauthorizedException('Invalid credentials');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

  const payload = { sub: user.id, email: user.email, role: user.role };
  const token = this.jwtService.sign(payload);

  delete user.password;

  return {
    message: 'Login successful',
    data: user,
    token,
  };
}

}

