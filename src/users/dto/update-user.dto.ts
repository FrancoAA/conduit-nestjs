import { IsOptional, IsNotEmpty } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsNotEmpty()
  username: string;

  @IsOptional()
  @IsNotEmpty()
  bio: string;

  @IsOptional()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsNotEmpty()
  image: string;
}