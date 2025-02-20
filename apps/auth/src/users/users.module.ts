import { DatabaseModule, LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import {
  UserDocument,
  userSchema,
} from '../../../../libs/common/src/models/user.schema';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: UserDocument.name, schema: userSchema },
    ]),
    LoggerModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
