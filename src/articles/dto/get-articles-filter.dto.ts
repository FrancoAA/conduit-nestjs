import { IsOptional, IsIn, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class GetArticlesFilterDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  tag: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  author: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  favorited: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  limit: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  offset: number;
}