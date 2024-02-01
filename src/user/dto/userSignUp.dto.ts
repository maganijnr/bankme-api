import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum } from 'class-validator';
import { UserAccountType } from '../schema/user.schema';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10, { message: 'Phone number is not valid.' })
  readonly phone_number: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password is not valid.' })
  readonly password: string;
   
   @IsNotEmpty()
   @IsEnum(UserAccountType, { message: "Please enter a valid user account type." })
   readonly account_type: UserAccountType;

}
