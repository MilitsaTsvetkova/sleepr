import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from '../models/user.entity';

const getUserFromContext = (context: ExecutionContext): UserDocument => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => getUserFromContext(context),
);
