import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', 'src/views/partials'));

  app.enableCors({
    origin: '*',
  });
  hbs.registerHelper('checkArray', function (value: [], options) {
    if (value.length > 0) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });
  hbs.registerHelper('check', function (value: any, comparator: any, options) {
    if (value === comparator) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  await app.listen(3000);
}
bootstrap();
