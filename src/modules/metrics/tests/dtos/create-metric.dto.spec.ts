import { Test, TestingModule } from '@nestjs/testing';

import { ValidationError } from 'class-validator';
import {
  DistanceUnit,
  MetricType,
  TemperatureUnit,
} from '../../../../shared/constants/metrics.constants';
import { CreateMetricDto } from '../../dto/create-metric.dto';
import { ValidateUnit } from '../../../../shared/helpers/validator.helper';

describe('CreateMetricDto', () => {
  let createMetricDto: CreateMetricDto;

  beforeEach(() => {
    createMetricDto = new CreateMetricDto();
  });

  it('should throw an error if unit is not valid', async () => {
    const invalidUnit = 'invalidUnit';

    try {
      createMetricDto.unit = invalidUnit as DistanceUnit | TemperatureUnit;
      await validate(createMetricDto);
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.property).toBe('unit');
      expect(error.constraints).toHaveProperty(
        'validateUnit',
        `unit must be a valid unit`,
      );
    }
  });

  it('should pass validation if unit is valid for distance type', async () => {
    const validUnit = DistanceUnit.METER;

    createMetricDto.type = MetricType.DISTANCE;
    createMetricDto.unit = validUnit;

    const result = await validate(createMetricDto);

    expect(result).toBeTruthy();
  });

  it('should pass validation if unit is valid for temperature type', async () => {
    const validUnit = TemperatureUnit.CELSIUS;

    createMetricDto.type = MetricType.TEMPERATURE;
    createMetricDto.unit = validUnit;

    const result = await validate(createMetricDto);

    expect(result).toBeTruthy();
  });
});

async function validate(dto: any) {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      {
        provide: ValidateUnit,
        useValue: {
          validate: jest.fn().mockReturnValue(true),
        },
      },
    ],
  }).compile();

  const validateUnit = module.get<ValidateUnit>(ValidateUnit);
  return validateUnit.validate(dto.unit, { ...dto });
}
