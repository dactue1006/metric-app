import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/config.service';
import { VersioningType, Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerConfig } from './config/swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe({}));
  app.setGlobalPrefix('api/');
  app.get(SwaggerConfig).setupSwagger(app);
  const port = app.get(AppConfigService).get('app.port');
  await app.listen(port, '0.0.0.0', async () => {
    Logger.log(`Server is running : ${await app.getUrl()}`);
  });
}
bootstrap().catch((error) => {
  console.error(error);
});
