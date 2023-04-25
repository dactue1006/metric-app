import { PaginationParam } from '../interfaces';
import { ISortOrder } from '../interfaces/sort.interface';

export const pipelineBuilder = (sort: ISortOrder, match: any, project) => {
  const pipeQuery: any[] = [{ $match: match }];
  if (project) {
    pipeQuery.push({
      $project: {
        ...project,
      },
    });
  }

  if (Object.keys(sort).length !== 0) {
    pipeQuery.push({
      $sort: sort,
    });
  } else {
    pipeQuery.push({
      $sort: {
        date: -1,
      },
    });
  }
  return pipeQuery;
};

export const pipelineBuilderWithPagination = (
  paginationParam: PaginationParam,
  sort: ISortOrder,
  match: any,
  project: any,
) => {
  const pipeQuery: any[] = pipelineBuilder(sort, match, project);

  const { page, limit } = paginationParam;
  const skip = limit * (page - 1);

  pipeQuery.push({
    $facet: {
      paginatedResults: [{ $skip: skip }, { $limit: limit }],
      total: [{ $count: 'count' }],
    },
  });

  return pipeQuery;
};
