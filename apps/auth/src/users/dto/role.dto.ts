import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RoleDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsNumber()
  id?: number;
}
