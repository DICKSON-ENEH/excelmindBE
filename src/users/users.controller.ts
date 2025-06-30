import { Controller, Post, Body, Query, NotFoundException, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { User } from 'src/utils/types';




 class UserDto {
  id: string;
  name: string;
  email: string;
  role: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

@Post('create-user')
async createUser(@Body() createUserDto: UserEntity): Promise<{ message: string; data: Partial<UserDto> }> {
  return this.usersService.createUser(createUserDto);
}


  @Post('login')
  async login(
    @Body() credentials: { email: string; password: string },
  ): Promise<{ message: string; data: Partial<UserDto>; token: string }> {
    return this.usersService.login(credentials.email, credentials.password);
  }
@Get("all-users")
async getAll(): Promise<UserEntity[]> {
  return this.usersService.getAllUsers();
}


  @Get('find-by-email')
  async getUserByEmail(@Query('email') email: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}



    