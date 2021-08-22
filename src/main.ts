import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/validators/pipe.validator';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import * as methodOverride from 'method-override'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

   app.setBaseViewsDir(join(__dirname, '..', 'views/layouts'));
  // app.setViewEngine('hbs');
  // hbs.registerPartials(join(__dirname, '..', '/views/partials'));

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));

  app.useGlobalPipes(new ValidateInputPipe());
  app.use(methodOverride('_method'))
  await app.listen(3000);
}
bootstrap();
