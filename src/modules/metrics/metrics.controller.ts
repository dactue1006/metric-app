import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { BulkCreateMetricDto, CreateMetricDto } from './dto/create-metric.dto';
import { ApiQuery } from '@nestjs/swagger';
import { IMetricFilter } from './interfaces/metrics-filter.interface';
import { CurrentUser } from '../../shared/decorators';
import { Pagination } from '../../shared/decorators/pagination.decorator';
import { ISortOrder, PaginationParam } from '../../shared/interfaces';
import { Sort } from '../../shared/decorators/sort.decorator';
import { MetricFilterDto } from './dto/metric-filter.dto';
import { ChartType } from '../../shared/constants/chart.constants';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('')
  @ApiQuery({
    name: 'type',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'unit',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    type: String,
  })
  getMetrics(
    @CurrentUser() user,
    @Query() metricFilterDto: MetricFilterDto,
    @Pagination() paginationParam?: PaginationParam,
    @Sort() sort?: ISortOrder,
  ) {
    const query: IMetricFilter = {
      ...metricFilterDto,
      userId: user.id,
    };
    return this.metricsService.getMetrics(paginationParam, sort, query);
  }

  @Get('/chart')
  @ApiQuery({
    name: 'type',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'unit',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    type: String,
  })
  getMetricsChart(
    @CurrentUser() user,
    @Query() metricFilterDto: MetricFilterDto,
    @Query('chartType') chartType: ChartType,
  ) {
    const query: IMetricFilter = {
      ...metricFilterDto,
      userId: user.id,
    };
    return this.metricsService.getMetricChart(query, chartType);
  }

  @Post()
  create(@Body() createMetricDto: CreateMetricDto, @CurrentUser() user) {
    return this.metricsService.create(user.id, createMetricDto);
  }

  @Post('bulk-insert')
  bulkInsert(
    @CurrentUser() user,
    @Body() bulkCreateMetricDto: BulkCreateMetricDto,
  ) {
    return this.metricsService.bulkInsert(user.id, bulkCreateMetricDto);
  }
}
