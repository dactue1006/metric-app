import Decimal from 'decimal.js';
import {
  DistanceUnit,
  TemperatureUnit,
} from '../../../constants/metrics.constants';

import {
  convertDistanceFromBaseUnit,
  convertFromBaseUnit,
  convertTemperatureFromBaseUnit,
} from '../../../helpers/metric.helper';

describe('convertDistanceFromBaseUnit', () => {
  it('1. should convert from meters to centimeters', () => {
    const value = 5;
    const unit = DistanceUnit.CENTIMETER;
    const expected = new Decimal(value * 100).toNumber();
    const result = convertDistanceFromBaseUnit(value, unit);
    expect(result).toEqual(expected);
  });

  it('2. should convert from meters to inches', () => {
    const value = 3;
    const unit = DistanceUnit.INCH;
    const expected = new Decimal(value / 0.0254).toNumber();
    const result = convertDistanceFromBaseUnit(value, unit);
    expect(result).toBeCloseTo(expected);
  });

  it('3. should convert from meters to feet', () => {
    const value = 2;
    const unit = DistanceUnit.FEET;
    const expected = new Decimal(value / 0.3048).toNumber();
    const result = convertDistanceFromBaseUnit(value, unit);
    expect(result).toBeCloseTo(expected);
  });

  it('4. should convert from meters to yards', () => {
    const value = 4;
    const unit = DistanceUnit.YARD;
    const expected = new Decimal(value / 0.9144).toNumber();
    const result = convertDistanceFromBaseUnit(value, unit);
    expect(result).toBeCloseTo(expected);
  });

  it('5. should return the same value for an unknown unit', () => {
    const value = 10;
    const unit = 'UNKNOWN_UNIT';
    const result = convertDistanceFromBaseUnit(value, unit as DistanceUnit);
    expect(result).toEqual(value);
  });
});

describe('convertTemperatureFromBaseUnit', () => {
  it('1. should convert from Celsius to Celsius', () => {
    const value = 10;
    const unit = TemperatureUnit.CELSIUS;
    const expected = new Decimal(value).toNumber();
    const result = convertTemperatureFromBaseUnit(value, unit);
    expect(result).toEqual(expected);
  });

  it('2. should convert from Celsius to Fahrenheit', () => {
    const value = 25;
    const unit = TemperatureUnit.FAHRENHEIT;
    const expected = new Decimal(value * 1.8 + 32).toNumber();
    const result = convertTemperatureFromBaseUnit(value, unit);
    expect(result).toEqual(expected);
  });

  it('3. should convert from Celsius to Kelvin', () => {
    const value = 30;
    const unit = TemperatureUnit.KELVIN;
    const expected = new Decimal(value + 273.15).toNumber();
    const result = convertTemperatureFromBaseUnit(value, unit);
    expect(result).toEqual(expected);
  });

  it('4. should return the same value for an unknown unit', () => {
    const value = 40;
    const unit = 'UNKNOWN_UNIT';
    const result = convertTemperatureFromBaseUnit(
      value,
      unit as TemperatureUnit,
    );
    expect(result).toEqual(value);
  });
});

describe('convertFromBaseUnit', () => {
  // Test cases for distance units
  it('1. should convert from meter to centimeter correctly', () => {
    const result = convertFromBaseUnit(1, DistanceUnit.CENTIMETER);
    expect(result).toBe(100); // 1 m = 100 cm
  });

  it('2. should convert from meter to inch correctly', () => {
    const result = convertFromBaseUnit(1, DistanceUnit.INCH);
    expect(result).toBeCloseTo(39.3701); // 1 m = 39.3701 inches
  });

  it('3. should convert from meter to feet correctly', () => {
    const result = convertFromBaseUnit(1, DistanceUnit.FEET);
    expect(result).toBeCloseTo(3.2808); // 1 m = 3.2808 feet
  });

  it('4. should convert from meter to yard correctly', () => {
    const result = convertFromBaseUnit(1, DistanceUnit.YARD);
    expect(result).toBeCloseTo(1.0936); // 1 m = 1.0936 yards
  });

  // Test cases for temperature units
  it('5. should convert from Celsius to Celsius correctly', () => {
    const result = convertFromBaseUnit(25, TemperatureUnit.CELSIUS);
    expect(result).toBe(25); // 25°C = 25°C
  });

  it('6. should convert from Celsius to Fahrenheit correctly', () => {
    const result = convertFromBaseUnit(2, TemperatureUnit.FAHRENHEIT);
    expect(result).toBe(35.6); // 2°C = 2 * 1.8 + 32 = 35.6°F
  });

  it('7. should convert from Celsius to Kelvin correctly', () => {
    const result = convertFromBaseUnit(3, TemperatureUnit.KELVIN);
    expect(result).toBe(276.15); // 3°C = 276.15 K
  });

  // Test case for unsupported units
  it('8. should throw an error for unsupported units', () => {
    expect(() => {
      convertFromBaseUnit(100, 'UNSUPPORTED_UNIT' as DistanceUnit);
    }).toThrow('Unsupported unit');
  });
});
