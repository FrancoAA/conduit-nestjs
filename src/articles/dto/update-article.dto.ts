import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class UpdateArticleDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  body: string;

  @IsOptional()
  @IsNotEmpty()
  tagList: Array<string>;
}