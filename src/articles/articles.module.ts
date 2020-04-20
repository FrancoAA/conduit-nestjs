import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from './schemas/article.schema';
import { UsersModule } from '../users/users.module';
import { UserSchema } from '../users/schemas/user.schema';
import { ArticleCommentSchema } from './schemas/article-comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Article', schema: ArticleSchema },
      { name: 'User', schema: UserSchema },
      { name: 'ArticleComment', schema: ArticleCommentSchema },
    ]),
    UsersModule,
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
