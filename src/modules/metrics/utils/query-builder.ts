import { PaginationParam } from '../../../shared/interfaces';
import { ISortOrder } from '../../../shared/interfaces/sort.interface';
import {
  pipelineBuilder,
  pipelineBuilderWithPagination,
} from '../../../shared/helpers/query-builder.helper';
import { IMetricFilter } from '../interfaces/metrics-filter.interface';
import { MetricType } from '../../../shared/constants/metrics.constants';
import * as moment from 'moment';
import { parseObjectId } from '../../../shared/utils/mongoose.util';

export const queryBuilderMetrics = (metricFilter: IMetricFilter) => {
  const match: any = {};

  match.type = metricFilter?.type || MetricType.DISTANCE;

  if (metricFilter?.userId) {
    match.userId = parseObjectId(metricFilter.userId);
  }

  match.date = {};
  if (metricFilter.startDate) {
    match.date.$gte = moment(metricFilter?.startDate).utc().toDate();
  }
  if (metricFilter.endDate) {
    match.date.$lte = moment(metricFilter?.endDate).utc().toDate();
  }

  if (!Object.keys(match.date).length) {
    delete match.date;
  }

  return match;
};

export const pipelineBuilderMetricsWithPagination = (
  paginationParam: PaginationParam,
  sort: ISortOrder,
  match: any,
  project: any,
) => {
  return pipelineBuilderWithPagination(paginationParam, sort, match, project);
};

export const pipelineBuilderMetrics = (
  sort: ISortOrder,
  match: any,
  projection,
) => {
  return pipelineBuilder(sort, match, projection);
};
