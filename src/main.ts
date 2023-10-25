import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { initSwagger } from './app.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ abortOnError: false });
  app.setGlobalPrefix('/api'); // Setting base path
  initSwagger(app);
  
  app.useGlobalPipes(
    new ValidationPipe(
      { 
       whitelist: true,
        transform: true,
      })
    );
  app.enableCors({
    origin: 'http://localhost:3000', // Cambia esta URL al dominio del frontend
    credentials: true, // Habilita las credenciales (cookies, encabezados de autenticación, etc.)
  });
  await app.listen(3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
