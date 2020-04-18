import { Model } from 'mongoose';
import {
  Injectable,
  Logger,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './schemas/article.interface';
import { GetArticlesFilterDto } from './dto/get-articles-filter.dto';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { User } from 'src/users/schemas/user.interface';

@Injectable()
export class ArticlesService {
  private logger = new Logger('ArticlesService');

  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async createArticle(
    createArticleDto: CreateArticleDto,
    user: User,
  ): Promise<Article> {
    const newArticle = new this.articleModel(createArticleDto);
    this.logger.debug(`createArticle: ${user}`);
    newArticle.author = user._id;
    return newArticle.save();
  }

  async getArticles(filters: GetArticlesFilterDto) {
    let query = {};
    // all the filters are mutually exclusive

    // filter by tag
    if (filters.tag) {
      query['tagList'] = filters.tag;
    }
    // filter by author
    else if (filters.author) {
      // look for the author id
      const user = await this.userModel.findOne({ username: filters.author });
      if (user) {
        this.logger.debug(
          `Filter by Author: ${filters.author} id: ${user._id}`,
        );
        query['author'] = user._id;
      }
    }
    // filter by author
    else if (filters.favorited) {
      // look for the author id
      const user = await this.userModel.findOne({ username: filters.author });
      if (user) {
        this.logger.debug(
          `Filter by Favorited: ${filters.favorited} id: ${user._id}`,
        );
        query['favoritedBy'] = user._id;
      }
    }

    const articles = await this.articleModel
      .find(query)
      .select({
        slug: 1,
        title: 1,
        description: 1,
        body: 1,
        tagList: 1,
        createdAt: 1,
        updatedAt: 1,
      })
      .skip(filters.offset || 0)
      .limit(filters.limit || 20)
      .exec();
    return articles;
  }

  async getArticle(slug: string) {
    return this.articleModel.findOne({ slug });
  }

  async updateArticle(
    slug: string,
    updatedArticle: UpdateArticleDto,
    user: User,
  ) {
    return this.articleModel.findOneAndUpdate(
      { slug, author: user._id },
      UpdateArticleDto,
      {
        new: true,
        runValidators: true,
      },
    );
  }
}
