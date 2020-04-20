import { Model } from 'mongoose';
import {
  Injectable,
  Logger,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './schemas/article.interface';
import { ArticleComment } from './schemas/article-comment.interface';
import { GetArticlesFilterDto } from './dto/get-articles-filter.dto';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { User } from '../users/schemas/user.interface';
import { PostCommentDto } from './dto/post-comment.dto';

@Injectable()
export class ArticlesService {
  private logger = new Logger('ArticlesService');

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Article') private readonly articleModel: Model<Article>,
    @InjectModel('ArticleComment')
    private readonly articleCommentModel: Model<ArticleComment>,
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

  async postComment(slug: string, postCommentDto: PostCommentDto, user: User) {
    const article = await this.getArticle(slug);
    if (!article) {
      throw new NotFoundException(`Article ${slug} not found`);
    }
    // creates the new comment with all its info
    const comment = new this.articleCommentModel(postCommentDto);
    comment.author = user;
    await comment.save();
    // associates the comment with the article
    await this.articleModel.updateOne(
      { slug },
      { $push: { comments: comment._id } },
    );
    // returns the newly created comment
    return comment;
  }

  async getComments(slug: string) {
    const articleWithComments = await this.articleModel
      .findOne({ slug })
      .populate('comments');
    return articleWithComments.comments;
  }

  async deleteComment(slug: string, commentId: string, user: User) {
    const article = await this.getArticle(slug);
    article.comments.pull(commentId);
    await article.save();

    const result = await this.articleCommentModel.deleteOne({
      _id: commentId,
      author: user._id,
    });

    if (result.deletedCount === 0) {
      throw new NotFoundException();
    }
  }
}
