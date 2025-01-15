import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}
  async create(createUser: CreateUserDto) {
    await this.validateCreateUser(createUser.email);
    return this.userRepository.create({
      ...createUser,
      password: await bcrypt.hash(createUser.password, 10),
    });
  }

  async validateCreateUser(email: string) {
    try {
      await this.userRepository.findOne({ email });
    } catch (error) {
      return;
    }
    throw new UnprocessableEntityException('User already exists');
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credentials are invalid');
    }
    return user;
  }

  async findById(id: string) {
    return this.userRepository.findOne({ _id: id });
  }
}
