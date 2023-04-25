import Decimal from 'decimal.js';

export enum MetricType {
  DISTANCE = 'distance',
  TEMPERATURE = 'temperature',
}

export enum DistanceUnit {
  METER = 'meter',
  CENTIMETER = 'centimeter',
  INCH = 'inch',
  FEET = 'feet',
  YARD = 'yard',
}

export enum TemperatureUnit {
  CELSIUS = 'celsius',
  FAHRENHEIT = 'fahrenheit',
  KELVIN = 'kelvin',
}

export const BASE_DISTANCE_UNIT = DistanceUnit.METER;
export const BASE_TEMPERATURE_UNIT = TemperatureUnit.CELSIUS;

export const CENTIMETER_TO_METER = new Decimal(1).dividedBy(100);
export const INCH_TO_METER = new Decimal(0.0254);
export const FEET_TO_METER = new Decimal(0.3048);
export const YARD_TO_METER = new Decimal(0.9144);
export const CELSIUS_TO_CELSIUS = new Decimal(1);
export const FAHRENHEIT_TO_CELSIUS = new Decimal(5 / 9);
export const KELVIN_TO_CELSIUS = new Decimal(0).minus(273.15);
