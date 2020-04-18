import {
  Controller,
  Query,
  Get,
  Post,
  Patch,
  Delete,
  ValidationPipe,
  UsePipes,
  Body,
  Put,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { GetArticlesFilterDto } from './dto/get-articles-filter.dto';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PostCommentDto } from './dto/post-comment.dto';
import { ArticlesService } from './articles.service';
import { GetUser } from 'src/users/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/schemas/user.interface';

@Controller('articles')
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}

  @Get()
  async getArticles(@Query(ValidationPipe) filters: GetArticlesFilterDto) {
    // return `getArticles: ${JSON.stringify(filters)}`;
    return this.articleService.getArticles(filters);
  }

  @Get('/feed')
  @UseGuards(AuthGuard())
  async getUserFeed(@GetUser() user: User) {
    return 'getUserFeed';
  }

  @Get('/:slug')
  async getArticle(@Param('slug') slug: string) {
    // return `getArticle ${slug}`;
    return this.articleService.getArticle(slug);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  async createArticle(
    @Body() createArticleDto: CreateArticleDto,
    @GetUser() user: User,
  ) {
    return this.articleService.createArticle(createArticleDto, user);
  }

  @Put('/:slug')
  async updateArticle(
    @Param('slug') slug: string,
    @Body() updateArticle: UpdateArticleDto,
    @GetUser() user: User,
  ) {
    // return `updateArticle: ${slug} ${JSON.stringify(updateArticle)}`;
    return this.articleService.updateArticle(slug, updateArticle, user);
  }

  @Post('/:slug/comments')
  async postComment(
    @Param('slug') slug: string,
    @Body() postCommentDto: PostCommentDto,
  ) {
    return `postComment: ${slug} ${postCommentDto}`;
  }

  @Get('/:slug/comments')
  async getArticleComments(@Param('slug') slug: string) {
    return `getArticleComments ${slug}`;
  }

  @Delete('/:slug/comments/:id')
  async deleteArticleComment(
    @Param('slug') slug: string,
    @Param('id') id: number,
  ) {
    return `deleteArticleComment ${slug} ${id}`;
  }

  @Post('/:slug/favorite')
  async favArticle(@Param('slug') slug: string) {
    return `favArticle ${slug}`;
  }

  @Delete('/:slug/favorite')
  async unfavArticle(@Param('slug') slug: string) {
    return `unfavArticle ${slug}`;
  }
}
