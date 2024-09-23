import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { config } from 'dotenv';
import { json, urlencoded } from 'express';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { createUser } from './common/_helpers';

export async function bootstrapServer() {
  config(); // Load environment variables

  const expressApp = require('express')();
  const adapter = new ExpressAdapter(expressApp);

  const app = await NestFactory.create(AppModule, adapter);

  // Set global prefix
  app.setGlobalPrefix('api');

  // Disable CORS by commenting out or removing the line
  // app.enableCors({ origin: '*' });
  app.enableCors({
    origin : 'http://localhost:4200'
  })

  // Apply global pipes
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Optionally configure global filters and interceptors if needed
  // app.useGlobalFilters(new ExceptionFilter());
  // app.useGlobalInterceptors(new SomeInterceptor());

  // Set up body parsers
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  // Set up Swagger
  const configService = app.get(ConfigService);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cats Example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  // Start the application
  const port = configService.get<number>('PORT') || 3000; // Default to 3000 if PORT is not set
  await app.listen(port, () => {
    console.log(`Application is running on: http://localhost:${port}`);
  });
}

bootstrapServer();
