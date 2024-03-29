import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Constants } from './common';
import { SuccessResponseInterceptor } from './utilities';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new SuccessResponseInterceptor());
  // TODO: Enable cors only for trusted frontend urls
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle(Constants.API_TITLE)
    .setVersion(Constants.API_VERSION)
    .addTag(Constants.API_TAG)
    .addBearerAuth({
      type: Constants.API_AUTH_TYPE as any,
      scheme: Constants.API_AUTH_SCHEMA,
      bearerFormat: Constants.API_AUTH_BEARER_FORMAT,
      in: Constants.API_AUTH_PATH
    },
      Constants.API_AUTH_NAME)
    .build();
  const options: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, options);


  await app.listen(3000);
}
bootstrap();
