import * as moment from 'moment';
import { ChartType } from '../../../constants/chart.constants';
import { getChartDates } from '../../../helpers/chart.helper';

describe('getChartDates', () => {
  beforeEach(() => {
    jest.spyOn(moment, 'utc').mockReturnValue(moment('2023-04-24T12:34:56Z'));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should return correct dates for chartType ONE_DAY', () => {
    const chartType = ChartType.ONE_DAY;
    const now = moment().utc();
    const expectedStartDate = moment(now).subtract(1, 'days').utc().toDate();
    const expectedEndDate = moment(now).utc().toDate();
    const result = getChartDates(chartType);
    expect(result.startDate).toEqual(expectedStartDate);
    expect(result.endDate).toEqual(expectedEndDate);
  });

  test('should return correct dates for chartType SEVEN_DAYS', () => {
    const chartType = ChartType.SEVEN_DAYS;
    const now = moment().utc();
    const expectedStartDate = moment(now).subtract(7, 'days').utc().toDate();
    const expectedEndDate = moment(now).utc().toDate();
    const result = getChartDates(chartType);
    expect(result.startDate).toEqual(expectedStartDate);
    expect(result.endDate).toEqual(expectedEndDate);
  });

  test('should return correct dates for chartType ONE_MONTH', () => {
    const chartType = ChartType.ONE_MONTH;
    const now = moment().utc();
    const expectedStartDate = moment(now).subtract(1, 'months').utc().toDate();
    const expectedEndDate = moment(now).utc().toDate();
    const result = getChartDates(chartType);
    expect(result.startDate).toEqual(expectedStartDate);
    expect(result.endDate).toEqual(expectedEndDate);
  });

  test('should return correct dates for chartType THREE_MONTHS', () => {
    const chartType = ChartType.THREE_MONTHS;
    const now = moment().utc();
    const expectedStartDate = moment(now).subtract(3, 'months').utc().toDate();
    const expectedEndDate = moment(now).utc().toDate();
    const result = getChartDates(chartType);
    expect(result.startDate).toEqual(expectedStartDate);
    expect(result.endDate).toEqual(expectedEndDate);
  });

  test('should return correct dates for chartType ONE_YEAR', () => {
    const chartType = ChartType.ONE_YEAR;
    const now = moment().utc();
    const expectedStartDate = moment(now).subtract(1, 'years').utc().toDate();
    const expectedEndDate = moment(now).utc().toDate();
    const result = getChartDates(chartType);
    expect(result.startDate).toEqual(expectedStartDate);
    expect(result.endDate).toEqual(expectedEndDate);
  });

  test('should return correct dates for chartType YTD', () => {
    const chartType = ChartType.YTD;
    const now = moment().utc();
    const expectedStartDate = moment(now).startOf('year').utc().toDate();
    const expectedEndDate = moment(now).utc().toDate();
    const result = getChartDates(chartType);
    expect(result.startDate).toEqual(expectedStartDate);
    expect(result.endDate).toEqual(expectedEndDate);
  });

  test('should throw error for invalid chartType', () => {
    const chartType = 'invalidChartType' as ChartType;
    expect(() => getChartDates(chartType)).toThrowError('Invalid chartType');
  });
});
