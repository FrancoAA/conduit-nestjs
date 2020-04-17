import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ArticlesModule } from './articles/articles.module';
import { TagsModule } from './tags/tags.module';

import * as config from 'config';

const DbConfig = config.get('db');

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${DbConfig.host}:${DbConfig.port}/${DbConfig.database}`,
    ),
    UsersModule,
    ProfilesModule,
    ArticlesModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
