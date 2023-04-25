import {
  BASE_DISTANCE_UNIT,
  BASE_TEMPERATURE_UNIT,
  DistanceUnit,
  MetricType,
  TemperatureUnit,
} from '../../../constants/metrics.constants';

import {
  getBaseUnitFromType,
  isDistanceUnit,
  isTemperatureUnit,
} from '../../../helpers/metric.helper';

describe('Check valid Unit', () => {
  // Test for isDistanceUnit
  it('1. should return true for valid distance units', () => {
    expect(isDistanceUnit(DistanceUnit.CENTIMETER)).toBe(true);
    expect(isDistanceUnit(DistanceUnit.INCH)).toBe(true);
    expect(isDistanceUnit(DistanceUnit.FEET)).toBe(true);
    expect(isDistanceUnit(DistanceUnit.YARD)).toBe(true);
  });

  it('2. should return false for invalid distance units', () => {
    expect(isDistanceUnit('invalidUnit')).toBe(false);
    expect(isDistanceUnit(TemperatureUnit.CELSIUS)).toBe(false);
  });

  // Test for isTemperatureUnit
  it('3. should return true for valid temperature units', () => {
    expect(isTemperatureUnit(TemperatureUnit.CELSIUS)).toBe(true);
    expect(isTemperatureUnit(TemperatureUnit.FAHRENHEIT)).toBe(true);
    expect(isTemperatureUnit(TemperatureUnit.KELVIN)).toBe(true);
  });

  it('4. should return false for invalid temperature units', () => {
    expect(isTemperatureUnit('invalidUnit')).toBe(false);
    expect(isTemperatureUnit(DistanceUnit.CENTIMETER)).toBe(false);
  });
});

describe('getBaseUnitFromType', () => {
  test('1. should return the correct base unit for distance metric type', () => {
    expect(getBaseUnitFromType(MetricType.DISTANCE)).toBe(BASE_DISTANCE_UNIT);
  });

  test('2. should return the correct base unit for temperature metric type', () => {
    expect(getBaseUnitFromType(MetricType.TEMPERATURE)).toBe(
      BASE_TEMPERATURE_UNIT,
    );
  });

  test('3. should return the default base unit for unknown metric types', () => {
    expect(getBaseUnitFromType('unknownMetricType' as MetricType)).toBe(
      BASE_DISTANCE_UNIT,
    );
  });
});
