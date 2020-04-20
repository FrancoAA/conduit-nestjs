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
import { ParseObjectIdPipe } from '../common/parse-objectid.pipe';
import { ArticlesService } from './articles.service';
import { GetUser } from '../users/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/schemas/user.interface';

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
  @UsePipes(ValidationPipe)
  async updateArticle(
    @Param('slug') slug: string,
    @Body() updateArticle: UpdateArticleDto,
    @GetUser() user: User,
  ) {
    // return `updateArticle: ${slug} ${JSON.stringify(updateArticle)}`;
    return this.articleService.updateArticle(slug, updateArticle, user);
  }

  @Post('/:slug/comments')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  async postComment(
    @Param('slug') slug: string,
    @Body() postCommentDto: PostCommentDto,
    @GetUser() user: User,
  ) {
    // return `postComment: ${slug} ${postCommentDto}`;
    return this.articleService.postComment(slug, postCommentDto, user);
  }

  @Get('/:slug/comments')
  async getArticleComments(@Param('slug') slug: string) {
    const response = {
      comments: await this.articleService.getComments(slug),
    };
    return response;
  }

  @Delete('/:slug/comments/:id')
  @UseGuards(AuthGuard())
  async deleteArticleComment(
    @Param('slug') slug: string,
    @Param('id', ParseObjectIdPipe) id: string,
    @GetUser() user: User,
  ) {
    return this.articleService.deleteComment(slug, id, user);
  }

  @Post('/:slug/favorite')
  @UseGuards(AuthGuard())
  async favArticle(@Param('slug') slug: string, @GetUser() user: User) {
    return this.articleService.favoriteArticle(slug, user);
  }

  @Delete('/:slug/favorite')
  @UseGuards(AuthGuard())
  async unfavArticle(@Param('slug') slug: string, @GetUser() user: User) {
    return this.articleService.unfavArticle(slug, user);
  }
}
