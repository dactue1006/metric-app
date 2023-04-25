import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import {
  DistanceUnit,
  MetricType,
  TemperatureUnit,
} from '../../shared/constants/metrics.constants';

@ValidatorConstraint({ name: 'validateUnit', async: false })
export class ValidateUnit implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const type = args.object['type'];
    const unit = value;

    if (
      (type === MetricType.DISTANCE &&
        !Object.values(DistanceUnit).includes(unit)) ||
      (type === MetricType.TEMPERATURE &&
        !Object.values(TemperatureUnit).includes(unit))
    ) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const type = args.object['type'];
    const unit = args.value;

    const allowedUnits =
      type === MetricType.DISTANCE
        ? Object.values(DistanceUnit)
        : Object.values(TemperatureUnit);

    return `${unit} is not a valid unit for ${type}. Allowed units are: ${allowedUnits.join(
      ', ',
    )}`;
  }
}
