import Decimal from 'decimal.js';
import {
  BASE_DISTANCE_UNIT,
  BASE_TEMPERATURE_UNIT,
  CELSIUS_TO_CELSIUS,
  CENTIMETER_TO_METER,
  DistanceUnit,
  FAHRENHEIT_TO_CELSIUS,
  FEET_TO_METER,
  INCH_TO_METER,
  KELVIN_TO_CELSIUS,
  MetricType,
  TemperatureUnit,
  YARD_TO_METER,
} from '../constants/metrics.constants';

export const isDistanceUnit = (unit: any): boolean => {
  return Object.values(DistanceUnit).includes(unit);
};

export const isTemperatureUnit = (unit: any): boolean => {
  return Object.values(TemperatureUnit).includes(unit);
};

export const getBaseUnitFromType = (metricType: MetricType) => {
  switch (metricType) {
    case MetricType.DISTANCE:
      return BASE_DISTANCE_UNIT;
    case MetricType.TEMPERATURE:
      return BASE_TEMPERATURE_UNIT;
    default:
      return BASE_DISTANCE_UNIT;
  }
};

export const convertDistanceToBaseUnit = (
  value: number,
  unit: DistanceUnit,
): number => {
  const decimalValue = new Decimal(value);

  switch (unit) {
    case DistanceUnit.CENTIMETER:
      return decimalValue.times(CENTIMETER_TO_METER).toNumber();
    case DistanceUnit.INCH:
      return decimalValue.times(INCH_TO_METER).toNumber();
    case DistanceUnit.FEET:
      return decimalValue.times(FEET_TO_METER).toNumber();
    case DistanceUnit.YARD:
      return decimalValue.times(YARD_TO_METER).toNumber();
    default:
      return value;
  }
};

export const convertTemperatureToBaseUnit = (
  value: number,
  unit: TemperatureUnit,
): number => {
  const decimalValue = new Decimal(value);

  switch (unit) {
    case TemperatureUnit.CELSIUS:
      return decimalValue.times(CELSIUS_TO_CELSIUS).toNumber();
    case TemperatureUnit.FAHRENHEIT:
      // Convert Fahrenheit to Celsius: (°F - 32) * 5/9
      return decimalValue.minus(32).times(FAHRENHEIT_TO_CELSIUS).toNumber();
    case TemperatureUnit.KELVIN:
      // Convert Kelvin to Celsius: K - 273.15
      return decimalValue.plus(KELVIN_TO_CELSIUS).toNumber();
    default:
      return value;
  }
};

export const convertToBaseUnit = (value: number, unit: string): number => {
  const decimalValue = new Decimal(value);

  if (isDistanceUnit(unit)) {
    return convertDistanceToBaseUnit(
      decimalValue.toNumber(),
      unit as DistanceUnit,
    );
  }

  if (isTemperatureUnit(unit)) {
    return convertTemperatureToBaseUnit(
      decimalValue.toNumber(),
      unit as TemperatureUnit,
    );
  }

  throw new Error('Unsupported unit');
};

export const convertDistanceFromBaseUnit = (
  value: number,
  unit: DistanceUnit,
): number => {
  const decimalValue = new Decimal(value);

  switch (unit) {
    case DistanceUnit.CENTIMETER:
      return decimalValue.dividedBy(CENTIMETER_TO_METER).toNumber();
    case DistanceUnit.INCH:
      return decimalValue.dividedBy(INCH_TO_METER).toNumber();
    case DistanceUnit.FEET:
      return decimalValue.dividedBy(FEET_TO_METER).toNumber();
    case DistanceUnit.YARD:
      return decimalValue.dividedBy(YARD_TO_METER).toNumber();
    default:
      return value;
  }
};

export const convertTemperatureFromBaseUnit = (
  value: number,
  unit: TemperatureUnit,
): number => {
  const decimalValue = new Decimal(value);

  switch (unit) {
    case TemperatureUnit.CELSIUS:
      return decimalValue.dividedBy(CELSIUS_TO_CELSIUS).toNumber();
    case TemperatureUnit.FAHRENHEIT:
      return decimalValue.dividedBy(FAHRENHEIT_TO_CELSIUS).plus(32).toNumber();
    case TemperatureUnit.KELVIN:
      return decimalValue.minus(KELVIN_TO_CELSIUS).toNumber();
    default:
      return value;
  }
};

export const convertFromBaseUnit = (
  value: number,
  unit: DistanceUnit | TemperatureUnit,
): number => {
  if (isDistanceUnit(unit)) {
    return convertDistanceFromBaseUnit(value, unit as DistanceUnit);
  }

  if (isTemperatureUnit(unit)) {
    return convertTemperatureFromBaseUnit(value, unit as TemperatureUnit);
  }

  throw new Error('Unsupported unit');
};

export const distanceConvert = (
  value: number,
  fromUnit: DistanceUnit,
  toUnit: DistanceUnit,
): number => {
  if (!isDistanceUnit(fromUnit) || !isDistanceUnit(toUnit)) {
    throw new Error('Unsupported units for distance conversion');
  }

  const convertedValue = convertFromBaseUnit(
    convertToBaseUnit(value, fromUnit),
    toUnit,
  );

  return convertedValue;
};

export const temperatureConvert = (
  value: number,
  fromUnit: TemperatureUnit,
  toUnit: TemperatureUnit,
): number => {
  if (!isTemperatureUnit(fromUnit) || !isTemperatureUnit(toUnit)) {
    throw new Error('Unsupported units for temperature conversion');
  }

  const convertedValue = convertFromBaseUnit(
    convertToBaseUnit(value, fromUnit),
    toUnit,
  );

  return convertedValue;
};

export const convertMetric = ({
  value,
  fromUnit,
  toUnit,
  metricType,
}: {
  value: number;
  fromUnit: DistanceUnit | TemperatureUnit;
  toUnit: DistanceUnit | TemperatureUnit;
  metricType: MetricType;
}): number => {
  const conversionFunctions = {
    [MetricType.DISTANCE]: distanceConvert,
    [MetricType.TEMPERATURE]: temperatureConvert,
  };

  if (!(metricType in conversionFunctions)) {
    throw new Error('Invalid metric type');
  }

  const convertFunction: any = conversionFunctions[metricType];

  return convertFunction(value, fromUnit as any, toUnit as any);
};
