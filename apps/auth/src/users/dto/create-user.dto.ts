import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  ValidateNested,
} from 'class-validator';
import { RoleDto } from './role.dto';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoleDto)
  roles?: RoleDto[];
}
