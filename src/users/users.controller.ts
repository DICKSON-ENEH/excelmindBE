import { Controller, Post, Body } from '@nestjs/common';
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
}



    