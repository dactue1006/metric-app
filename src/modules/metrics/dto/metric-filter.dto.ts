import {
  IsOptional,
  IsString,
  IsDateString,
  IsIn,
  Validate,
} from 'class-validator';
import { IMetricFilter } from '../interfaces/metrics-filter.interface';
import { MetricType } from '../../../shared/constants/metrics.constants';
import { ValidateUnit } from '../../../shared/helpers/validator.helper';

export class MetricFilterDto implements IMetricFilter {
  @IsOptional()
  @IsString()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsString()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  @IsIn([MetricType.DISTANCE, MetricType.TEMPERATURE])
  type?: MetricType;

  @IsOptional()
  @IsString()
  @Validate(ValidateUnit)
  unit?: string;
}
