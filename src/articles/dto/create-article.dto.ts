import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsOptional()
  @IsNotEmpty()
  tagList: Array<string>;
}