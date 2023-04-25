import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './config/database/mongoose.config';
import { SwaggerConfig } from './config/swagger/swagger.config';
import { MetricsModule } from './modules/metrics/metrics.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionInterceptor } from './exception-filters/all-exception-filter';

@Module({
  imports: [
    ConfigurationModule,
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    MetricsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SwaggerConfig,
    {
      provide: APP_FILTER,
      useClass: AllExceptionInterceptor,
    },
  ],
})
export class AppModule {}
