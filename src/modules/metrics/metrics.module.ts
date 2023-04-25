import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MetricModel, MetricSchema } from './model/metric.model';
import { MetricRepository } from './repositories/metric.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MetricModel.name, schema: MetricSchema, collection: 'metrics' },
    ]),
  ],

  controllers: [MetricsController],
  providers: [MetricsService, MetricRepository],
})
export class MetricsModule {}
