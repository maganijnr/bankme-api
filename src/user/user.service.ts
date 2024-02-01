import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/userSignUp.dto';
import * as bcrypt from 'bcryptjs';
import ApiFeatures from 'src/utils/apiFeatures.utils';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  generateAccountNumber() {
    return Math.random().toString().slice(2,12);
  }

  //Register a user
  async registerUserService(registerDto: SignUpDto) {
    const { name, email, password, phone_number, account_type } = registerDto;

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const emailExist = await this.userModel.findOne({ email: email });

    if (emailExist) {
      throw new ConflictException('Email already exists.');
    }

    const accountNumber = this.generateAccountNumber();

    const newUser = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      phone_number,
      account_number: accountNumber,
      account_type,
    });

    const token = await ApiFeatures.assignJwtToken(
      newUser?._id,
      this.jwtService,
    );

    return {
      access_token: token,
      user: newUser,
      message: 'User registered successfully.',
    };
  }
}
