import { Injectable } from '@nestjs/common';
import { MetricRepository } from './repositories/metric.repository';
import { BulkCreateMetricDto, CreateMetricDto } from './dto/create-metric.dto';
import { IMetricFilter } from './interfaces/metrics-filter.interface';
import { ISortOrder, PaginationParam } from '../../shared/interfaces';
import {
  convertMetric,
  convertToBaseUnit,
  getBaseUnitFromType,
} from '../../shared/helpers/metric.helper';
import {
  DistanceUnit,
  MetricType,
  TemperatureUnit,
} from '../../shared/constants/metrics.constants';
import * as moment from 'moment';
import { parseObjectId } from '../../shared/utils/mongoose.util';
import { ChartType } from '../../shared/constants/chart.constants';
import { getChartDates } from '../../shared/helpers/chart.helper';

@Injectable()
export class MetricsService {
  constructor(private readonly metricRepository: MetricRepository) {}

  bulkInsert(userId: string, createMetricDtos: BulkCreateMetricDto) {
    const metrics = createMetricDtos.metrics.map((metric) => ({
      insertOne: {
        document: {
          ...metric,
          date: moment(metric.date).utc().toDate(),
          value: convertToBaseUnit(metric.value, metric.unit),
          unit: getBaseUnitFromType(metric.type),
          userId: parseObjectId(userId),
        },
      },
    }));
    return this.metricRepository.bulkWrite(metrics);
  }

  create(userId: string, createMetricDto: CreateMetricDto) {
    const data = {
      ...createMetricDto,
      date: moment(createMetricDto.date).utc().toDate(),
      value: convertToBaseUnit(createMetricDto.value, createMetricDto.unit),
      unit: getBaseUnitFromType(createMetricDto.type),
      userId: parseObjectId(userId),
    };
    return this.metricRepository.createOne({ data });
  }

  convertMetrics(metrics: any[], unit: DistanceUnit | TemperatureUnit) {
    return metrics.map((metric) => ({
      ...metric,
      date: moment(metric.date).unix(),
      value: convertMetric({
        value: metric.value,
        fromUnit: metric.unit,
        toUnit: unit,
        metricType: metric.type,
      }),
      unit,
    }));
  }

  async getMetrics(
    paginationParam: PaginationParam,
    sort: ISortOrder,
    metricFilter: IMetricFilter,
  ) {
    let result: any = await this.metricRepository.getMetrics({
      paginationParam,
      sort,
      metricFilter,
    });
    const metricType = metricFilter?.type || MetricType.DISTANCE;
    const unit =
      (metricFilter.unit as DistanceUnit | TemperatureUnit) ||
      getBaseUnitFromType(metricType);

    if (paginationParam.isPaginate) {
      result.rows = this.convertMetrics(result.rows, unit);
    } else {
      result = this.convertMetrics(result, unit);
    }
    return result;
  }

  private generateDataChart(metrics) {
    return metrics.map((metric) => ({
      date: metric.date,
      value: metric.value,
    }));
  }

  async getMetricChart(metricFilter: IMetricFilter, chartType?: ChartType) {
    if (chartType) {
      const { startDate, endDate } = getChartDates(chartType);
      metricFilter.startDate = startDate?.toISOString();
      metricFilter.endDate = endDate?.toISOString();
    }
    const project = {
      date: 1,
      value: 1,
      type: 1,
      unit: 1,
    };
    let result: any = await this.metricRepository.getMetrics({
      metricFilter,
      project,
    });
    const metricType = metricFilter?.type || MetricType.DISTANCE;
    const unit =
      (metricFilter.unit as DistanceUnit | TemperatureUnit) ||
      getBaseUnitFromType(metricType);

    result = this.convertMetrics(result, unit);
    return this.generateDataChart(result);
  }
}
