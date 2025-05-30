import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'module-alias/register';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
  }); // TODO ver si se hace solo para desarrollo

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
