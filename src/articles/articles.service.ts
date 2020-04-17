import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './schemas/article.interface';
import { GetArticlesFilterDto } from './dto/get-articles-filter.dto';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  private logger = new Logger('ArticlesService');

  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>,
  ) {}

  async createArticle(createArticleDto: CreateArticleDto): Promise<Article> {
    const newArticle = new this.articleModel(createArticleDto);
    return newArticle.save();
  }

  async getArticles(filters: GetArticlesFilterDto) {
    const articles = await this.articleModel
      .find()
      .select({
        slug: 1,
        title: 1,
        description: 1,
        body: 1,
        tagList: 1,
        createdAt: 1,
        updatedAt: 1,
      })
      .exec();
    return articles;
  }

  async getArticle(slug: string) {
    return this.articleModel.findOne({ slug });
  }

  async updateArticle(slug: string, updatedArticle: UpdateArticleDto) {
    return this.articleModel.findOneAndUpdate({ slug }, UpdateArticleDto, {
      new: true,
      runValidators: true,
    });
  }
}
