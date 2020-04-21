import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from './schemas/article.schema';
import { UsersModule } from '../users/users.module';
import { UserSchema } from '../users/schemas/user.schema';
import { ArticleCommentSchema } from './schemas/article-comment.schema';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Article', schema: ArticleSchema },
      { name: 'ArticleComment', schema: ArticleCommentSchema },
    ]),
    UsersModule,
    TagsModule,
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
