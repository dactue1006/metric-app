import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  DistanceUnit,
  MetricType,
  TemperatureUnit,
} from '../../../shared/constants/metrics.constants';

@Schema()
class MetricModel extends Document {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true, enum: Object.values(MetricType) })
  type: MetricType;

  @Prop({
    required: true,
    enum: [...Object.values(DistanceUnit), ...Object.values(TemperatureUnit)],
  })
  unit: DistanceUnit | TemperatureUnit;

  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;
}

const MetricSchema = SchemaFactory.createForClass(MetricModel);

MetricSchema.index({ date: 1, type: 1 }, { sparse: true });

export { MetricModel, MetricSchema };
