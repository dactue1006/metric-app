import * as moment from 'moment';
import { ChartType } from '../constants/chart.constants';

export const getChartDates = (chartType: ChartType) => {
  const now = moment().utc();
  let startDate, endDate;

  switch (chartType) {
    case ChartType.ONE_DAY:
      startDate = moment(now).subtract(1, 'days').utc();
      endDate = moment(now).utc();
      break;
    case ChartType.SEVEN_DAYS:
      startDate = moment(now).subtract(7, 'days').utc();
      endDate = moment(now).utc();
      break;
    case ChartType.ONE_MONTH:
      startDate = moment(now).subtract(1, 'months').utc();
      endDate = moment(now).utc();
      break;
    case ChartType.THREE_MONTHS:
      startDate = moment(now).subtract(3, 'months').utc();
      endDate = moment(now).utc();
      break;
    case ChartType.ONE_YEAR:
      startDate = moment(now).subtract(1, 'years').utc();
      endDate = moment(now).utc();
      break;
    case ChartType.YTD:
      startDate = moment(now).startOf('year').utc();
      endDate = moment(now).utc();
      break;
    default:
      throw new Error('Invalid chartType');
  }

  return { startDate: startDate.toDate(), endDate: endDate.toDate() };
};
