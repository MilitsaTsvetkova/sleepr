import { Role, User } from '@app/common';
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

    const user = new User({
      ...createUser,
      password: await bcrypt.hash(createUser.password, 10),
      roles: createUser.roles?.map((role) => new Role(role)),
    });

    return this.userRepository.create(user);
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

  async findById(id: number) {
    return this.userRepository.findOne({ id }, { roles: true });
  }
}
