import Decimal from 'decimal.js';
import {
  DistanceUnit,
  TemperatureUnit,
} from '../../../constants/metrics.constants';

import {
  convertDistanceToBaseUnit,
  convertTemperatureToBaseUnit,
  convertToBaseUnit,
} from '../../../helpers/metric.helper';

describe('convertDistanceToBaseUnit', () => {
  it('1. should convert centimeters to meters', () => {
    const value = 100;
    const unit = DistanceUnit.CENTIMETER;
    const expected = new Decimal(value).times(0.01).toNumber();
    const result = convertDistanceToBaseUnit(value, unit);
    expect(result).toEqual(expected);
  });

  it('2. should convert inches to meters', () => {
    const value = 36;
    const unit = DistanceUnit.INCH;
    const expected = new Decimal(value).times(0.0254).toNumber();
    const result = convertDistanceToBaseUnit(value, unit);
    expect(result).toEqual(expected);
  });

  it('should convert feet to meters', () => {
    const value = 10;
    const unit = DistanceUnit.FEET;
    const expected = new Decimal(value).times(0.3048).toNumber();
    const result = convertDistanceToBaseUnit(value, unit);
    expect(result).toEqual(expected);
  });

  it('3. should convert yards to meters', () => {
    const value = 5;
    const unit = DistanceUnit.YARD;
    const expected = new Decimal(value).times(0.9144).toNumber();
    const result = convertDistanceToBaseUnit(value, unit);
    expect(result).toEqual(expected);
  });

  it('4. should return the same value for an unknown unit', () => {
    const value = 100;
    const unit = 'UNKNOWN_UNIT';
    const result = convertDistanceToBaseUnit(value, unit as DistanceUnit);
    expect(result).toEqual(value);
  });
});

describe('convertTemperatureToBaseUnit', () => {
  it('1. should convert Celsius to Celsius', () => {
    const value = 25;
    const unit = TemperatureUnit.CELSIUS;
    const expected = new Decimal(value).toNumber();
    const result = convertTemperatureToBaseUnit(value, unit);
    expect(result).toBeCloseTo(expected);
  });

  it('2. should convert Fahrenheit to Celsius', () => {
    const value = 77;
    const unit = TemperatureUnit.FAHRENHEIT;
    const expected = new Decimal((value - 32) * (5 / 9)).toNumber();
    const result = convertTemperatureToBaseUnit(value, unit);
    expect(result).toBeCloseTo(expected);
  });

  it('3. should convert Kelvin to Celsius', () => {
    const value = 298.15;
    const unit = TemperatureUnit.KELVIN;
    const expected = new Decimal(value - 273.15).toNumber();
    const result = convertTemperatureToBaseUnit(value, unit);
    expect(result).toBeCloseTo(expected);
  });

  it('4. should return the same value for an unknown unit', () => {
    const value = 100;
    const unit = 'UNKNOWN_UNIT';
    const result = convertTemperatureToBaseUnit(value, unit as TemperatureUnit);
    expect(result).toEqual(value);
  });
});

describe('convertToBaseUnit', () => {
  test('1. should convert centimeter to meter', () => {
    expect(convertToBaseUnit(100, DistanceUnit.CENTIMETER)).toBeCloseTo(1); // Using toBeCloseTo to account for floating-point rounding errors
  });

  test('2. should convert inch to meter', () => {
    expect(convertToBaseUnit(12, DistanceUnit.INCH)).toBeCloseTo(0.3048);
  });

  test('3. should convert feet to meter', () => {
    expect(convertToBaseUnit(3, DistanceUnit.FEET)).toBeCloseTo(0.9144);
  });

  test('4. should convert yard to meter', () => {
    expect(convertToBaseUnit(1, DistanceUnit.YARD)).toBeCloseTo(0.9144);
  });

  test('5. should not convert unknown distance units', () => {
    expect(() => convertToBaseUnit(100, 'unknownDistanceUnit')).toThrow(
      'Unsupported unit',
    );
  });

  test('6. should convert Celsius to Celsius', () => {
    expect(convertToBaseUnit(25, TemperatureUnit.CELSIUS)).toBe(25);
  });

  test('7. should convert Fahrenheit to Celsius', () => {
    expect(convertToBaseUnit(77, TemperatureUnit.FAHRENHEIT)).toBeCloseTo(25);
  });

  test('8. should convert Kelvin to Celsius', () => {
    expect(convertToBaseUnit(298, TemperatureUnit.KELVIN)).toBe(24.85);
  });

  test('9. should not convert unknown temperature units', () => {
    expect(() => convertToBaseUnit(100, 'unknownTemperatureUnit')).toThrow(
      'Unsupported unit',
    );
  });
});
