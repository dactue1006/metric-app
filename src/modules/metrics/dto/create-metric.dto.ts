import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  Min,
  Validate,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import {
  DistanceUnit,
  MetricType,
  TemperatureUnit,
} from '../../../shared/constants/metrics.constants';
import { ValidateUnit } from '../../../shared/helpers/validator.helper';
import { Type } from 'class-transformer';

export class CreateMetricDto {
  @ApiProperty()
  @IsISO8601(
    { strict: true },
    { message: 'Date must be a valid ISO 8601 date string' },
  )
  date: string;

  @ApiProperty()
  @IsNumber()
  @Min(0, { message: 'Value cannot be less than 0' })
  @ValidateIf((obj) => obj.type === MetricType.DISTANCE) // Only validate if type is 'distance'
  value: number;

  @ApiProperty()
  @IsEnum(MetricType, {
    message: "Type must be either 'distance' or 'temperature'",
  })
  type: MetricType;

  @ApiProperty()
  @IsNotEmpty({ message: 'Unit must be provided' })
  @Validate(ValidateUnit)
  unit: DistanceUnit | TemperatureUnit;
}

export class BulkCreateMetricDto {
  @ApiProperty({ type: CreateMetricDto, isArray: true })
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateMetricDto)
  metrics: CreateMetricDto[];
}
