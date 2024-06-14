import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // nestjs main app
  const app = await NestFactory.create(AppModule);

  // OpenAPI library for API self-documentation
  const docConfig = new DocumentBuilder()
    .setTitle('foodtruck-api')
    .setDescription('SF Food Truck CRUD API')
    .setVersion('0.1')
    .build();
  const doc = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('api', app, doc);

  // start server
  await app.listen(3000);
}
bootstrap();
