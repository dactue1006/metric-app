import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { MetricModel } from '../model/metric.model';
import {
  pipelineBuilderMetrics,
  pipelineBuilderMetricsWithPagination,
  queryBuilderMetrics,
} from '../utils/query-builder';
import { ISortOrder, PaginationParam } from '../../../shared/interfaces';
import { IMetricFilter } from '../interfaces/metrics-filter.interface';
import { BaseRepository } from '../../../base/base.repository';

export class MetricRepository extends BaseRepository<MetricModel> {
  constructor(
    @InjectModel(MetricModel.name)
    model: Model<MetricModel & Document>,
  ) {
    super(model);
  }

  async getMetrics({
    paginationParam = {},
    sort = {},
    metricFilter = {},
    project,
  }: {
    paginationParam?: PaginationParam | any;
    sort?: ISortOrder;
    metricFilter?: IMetricFilter;
    project?: { [key: string]: number };
  }) {
    const match: any = queryBuilderMetrics(metricFilter);
    const pipelinePagination = !paginationParam?.isPaginate
      ? pipelineBuilderMetrics(sort, match, project)
      : pipelineBuilderMetricsWithPagination(
          paginationParam,
          sort,
          match,
          project,
        );
    const result: any = await this.aggregate(pipelinePagination);
    if (!paginationParam.isPaginate) {
      return result;
    }
    const count = result[0]?.total[0]?.count;
    const metadata = {
      total: count || 0,
      page: paginationParam.page,
      limit: paginationParam.limit,
      totalPage: Math.ceil(count / paginationParam.limit) || 0,
    };
    return {
      rows: result[0]?.paginatedResults,
      metadata,
    };
  }
}
