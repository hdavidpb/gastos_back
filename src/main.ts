import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
//import * as auth from "exp"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
  });

  // app.use('/api/v1/meta/docs');

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Meta Swagger')
    .setDescription('Este es el swagger de meta')
    .setVersion('v.0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1/meta/docs', app, document);
  await app.listen(process.env.PORT || 3008);
}
bootstrap();
