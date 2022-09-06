import { Body, Controller, Get, Post } from '@nestjs/common';

import { LoginUserDTO, UserDTO } from 'src/dtos/user.dto';

import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(readonly userService: AuthService) {}

  @Get()
  getUsers() {
    return this.userService.getAllUsers();
  }

  @Post('register')
  createUser(@Body() body: UserDTO) {
    return this.userService.createUser(body);
  }

  @Post('login')
  loginUser(@Body() body: LoginUserDTO) {
    return this.userService.loginAccess(body);
  }
}
