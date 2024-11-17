// main.ts

import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))
  app.setGlobalPrefix('api')
  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from your Next.js app
    methods: 'GET, POST, PATCH, DELETE', // Allow specific HTTP methods
    credentials: true, // Allow cookies to be sent with requests
  });
  await app.listen(3001);
}
bootstrap();
