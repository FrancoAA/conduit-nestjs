import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { ArgumentOutOfRangeError } from 'rxjs';

const ServerConfig = config.get('server');
const PORT = process.env.PORT || ServerConfig.port;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();
