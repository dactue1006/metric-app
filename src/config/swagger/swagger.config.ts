import type { INestApplication } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppConfigService } from '../config.service';

@Injectable()
export class SwaggerConfig {
  constructor(private configService: AppConfigService) {}

  public setupSwagger(app: INestApplication): void {
    if (this.configService.get('swagger.mode') === 'on') {
      const config = new DocumentBuilder()
        .setTitle('Metrics Project API')
        .setDescription('The Metrics project APIs')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api/doc', app, document, {
        swaggerOptions: { filter: true },
      });
    }
  }
}
