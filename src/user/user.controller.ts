import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dto/userSignUp.dto';

@Controller('user')
export class UserController {
   constructor(private userService: UserService) { }
   
   //Handle user registration
   @Post('/register')
   signUp(
      @Body()
      registerDto: SignUpDto,
   ) {
      return this.userService.registerUserService(registerDto);
   }
}
