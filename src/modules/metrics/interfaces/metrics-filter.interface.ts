import { MetricType } from '../../../shared/constants/metrics.constants';

export interface IMetricFilter {
  userId?: string;
  type?: MetricType;
  unit?: string;
  startDate?: string;
  endDate?: string;
}
