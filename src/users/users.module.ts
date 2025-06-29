import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
// import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt'; // if you use JWT
import { UsersController } from './users.controller'; // optional, if you have one
import { User } from 'src/utils/types';

@Module({
  imports: [
 TypeOrmModule.forFeature([User]),

    JwtModule.register({
      secret: 'your-secret-key', // Ideally from env
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController], // if you have a controller
  exports: [UsersService], // export if needed in AuthModule, etc.
})
export class UsersModule {}
