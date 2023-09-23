import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { initSwagger } from './app.swagger';
/*import { useContainer } from 'class-validator';*/

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ abortOnError: false });
  /**/
  /*useContainer(app.select(AppModule), { fallback: true });*/
  /**/
  initSwagger(app);
  /*app.setGlobalPrefix('/api');*/ // Setting base path
  app.useGlobalPipes(
    new ValidationPipe(
      { 
       whitelist: true,
       /* transform: true,*/
      })
    );
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
