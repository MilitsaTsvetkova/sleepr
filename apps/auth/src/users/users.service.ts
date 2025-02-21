import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUser: CreateUserDto) {
    await this.validateCreateUser(createUser.email);
    return this.prismaService.user.create({
      data: {
        email: createUser.email,
        password: await bcrypt.hash(createUser.password, 10),
      },
    });
  }

  async validateCreateUser(email: string) {
    try {
      await this.prismaService.user.findUnique({ where: { email } });
    } catch (error) {
      return;
    }
    throw new UnprocessableEntityException('User already exists');
  }

  async validateUser(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credentials are invalid');
    }
    return user;
  }

  async findById(id: number) {
    return this.prismaService.user.findUniqueOrThrow({ where: { id } });
  }
}
