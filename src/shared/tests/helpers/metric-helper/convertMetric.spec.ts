import {
  DistanceUnit,
  MetricType,
  TemperatureUnit,
} from '../../../constants/metrics.constants';

import {
  convertMetric,
  distanceConvert,
  temperatureConvert,
} from '../../../helpers/metric.helper';

describe('distanceConvert', () => {
  test('1. should convert centimeter to meter', () => {
    const result = distanceConvert(
      100,
      DistanceUnit.CENTIMETER,
      DistanceUnit.METER,
    );
    expect(result).toBe(1); // Expected result: 1 meter
  });

  test('2. should convert inch to yard', () => {
    const result = distanceConvert(36, DistanceUnit.INCH, DistanceUnit.YARD);
    expect(result).toBe(1); // Expected result: 1 yard
  });

  test('3. should convert feet to centimeter', () => {
    const result = distanceConvert(
      5,
      DistanceUnit.FEET,
      DistanceUnit.CENTIMETER,
    );
    expect(result).toBe(152.4); // Expected result: 152.4 centimeters
  });

  test('4. should convert yard to inch', () => {
    const result = distanceConvert(2, DistanceUnit.YARD, DistanceUnit.INCH);
    expect(result).toBe(72); // Expected result: 72 inches
  });

  test('5. should throw error for unsupported units', () => {
    expect(() => {
      distanceConvert(
        100,
        'unsupportedUnit1' as DistanceUnit,
        'unsupportedUnit2' as DistanceUnit,
      );
    }).toThrow('Unsupported units for distance conversion'); // Expected result: Error with the specified error message
  });
});

describe('temperatureConvert', () => {
  test('1. should convert Celsius to Fahrenheit', () => {
    const result = temperatureConvert(
      25,
      TemperatureUnit.CELSIUS,
      TemperatureUnit.FAHRENHEIT,
    );
    expect(result).toBe(77); // Expected result: 77 Fahrenheit
  });

  test('2. should convert Fahrenheit to Kelvin', () => {
    const result = temperatureConvert(
      32,
      TemperatureUnit.FAHRENHEIT,
      TemperatureUnit.KELVIN,
    );
    expect(result).toBe(273.15); // Expected result: 273.15 Kelvin
  });

  test('3. should convert Kelvin to Celsius', () => {
    const result = temperatureConvert(
      300,
      TemperatureUnit.KELVIN,
      TemperatureUnit.CELSIUS,
    );
    expect(result).toBe(26.85); // Expected result: 26.85 Celsius
  });

  test('4. should throw error for unsupported units', () => {
    expect(() => {
      temperatureConvert(
        100,
        'unsupportedUnit1' as TemperatureUnit,
        'unsupportedUnit2' as TemperatureUnit,
      );
    }).toThrow('Unsupported units for temperature conversion'); // Expected result: Error with the specified error message
  });
});

describe('convertMetric', () => {
  it('1. should convert yards to centimeters correctly', () => {
    const result = convertMetric({
      value: 5,
      fromUnit: DistanceUnit.YARD,
      toUnit: DistanceUnit.CENTIMETER,
      metricType: MetricType.DISTANCE,
    });
    expect(result).toEqual(457.2); // Expected converted value for 5 yards to centimeters
  });

  it('2. should convert inches to feet correctly', () => {
    const result = convertMetric({
      value: 24,
      fromUnit: DistanceUnit.INCH,
      toUnit: DistanceUnit.FEET,
      metricType: MetricType.DISTANCE,
    });
    expect(result).toEqual(2); // Expected converted value for 24 inches to feet
  });

  it('3. should convert centimeters to inches correctly', () => {
    const result = convertMetric({
      value: 10,
      fromUnit: DistanceUnit.CENTIMETER,
      toUnit: DistanceUnit.INCH,
      metricType: MetricType.DISTANCE,
    });
    expect(result).toEqual(3.937007874015748); // Expected converted value for 10 centimeters to inches
  });

  it('4. should convert feet to inches correctly', () => {
    const result = convertMetric({
      value: 6,
      fromUnit: DistanceUnit.FEET,
      toUnit: DistanceUnit.INCH,
      metricType: MetricType.DISTANCE,
    });
    expect(result).toEqual(72); // Expected converted value for 6 feet to inches
  });

  it('5. should convert Fahrenheit to Kelvin correctly', () => {
    const result = convertMetric({
      value: 32,
      fromUnit: TemperatureUnit.FAHRENHEIT,
      toUnit: TemperatureUnit.KELVIN,
      metricType: MetricType.TEMPERATURE,
    });
    expect(result).toEqual(273.15); // Expected converted value for 32 degrees Fahrenheit to Kelvin
  });

  it('6. should convert Kelvin to Fahrenheit correctly', () => {
    const result = convertMetric({
      value: 300,
      fromUnit: TemperatureUnit.KELVIN,
      toUnit: TemperatureUnit.FAHRENHEIT,
      metricType: MetricType.TEMPERATURE,
    });
    expect(result).toEqual(80.33); // Expected converted value for 300 Kelvin to Fahrenheit
  });

  it('7. should throw an error for unsupported units', () => {
    expect(() => {
      convertMetric({
        value: 10,
        fromUnit: DistanceUnit.METER,
        toUnit: TemperatureUnit.CELSIUS,
        metricType: MetricType.DISTANCE,
      });
    }).toThrow('Unsupported units for distance conversion');

    expect(() => {
      convertMetric({
        value: 32,
        fromUnit: TemperatureUnit.FAHRENHEIT,
        toUnit: DistanceUnit.FEET,
        metricType: MetricType.TEMPERATURE,
      });
    }).toThrow('Unsupported units for temperature conversion');
  });
});
