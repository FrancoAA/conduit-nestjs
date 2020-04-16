import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ArticlesModule } from './articles/articles.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [UsersModule, ProfilesModule, ArticlesModule, TagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
