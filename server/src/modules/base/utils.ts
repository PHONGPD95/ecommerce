import { ObjectId } from 'mongodb';

import { IOrderArgs, IWhereArgs, IWhereArgsWithSearch } from '~modules/graphql/types';

export const OPERATORS_FIELDNAME = '_operators';

function prepareAndOrFilter(filter: IWhereArgs): IWhereArgs {
  if (!filter.OR && !filter.AND) {
    return;
  }

  const { OR, AND } = filter;
  if (OR) {
    const $or = OR.map(d => {
      prepareAndOrFilter(d);
      return processFilterOperators(d);
    });

    filter.$or = $or;
    delete filter.OR;
  }

  if (AND) {
    const $and = AND.map(d => {
      prepareAndOrFilter(d);
      return processFilterOperators(d);
    });

    filter.$and = $and;
    delete filter.AND;
  }
}

function processFilterOperators(filter: IWhereArgs): IWhereArgs {
  if (filter[OPERATORS_FIELDNAME]) {
    const operatorFields = filter[OPERATORS_FIELDNAME];
    const operatorFilters = [];
    Object.keys(operatorFields).forEach(fieldName => {
      const fieldOperators = { ...operatorFields[fieldName] };
      const criteria = {};
      Object.keys(fieldOperators).forEach(operatorName => {
        criteria[`$${operatorName}`] = fieldOperators[operatorName];
      });
      if (Object.keys(criteria).length > 0) {
        operatorFilters.push({ [fieldName]: criteria });
      }
    });

    const andOp = '$and';
    if (operatorFilters.length) {
      if (andOp in filter) {
        filter[andOp].push(...operatorFilters);
      } else {
        filter[andOp] = operatorFilters;
      }
    }

    delete filter[OPERATORS_FIELDNAME];
  }

  const idField = '_id';
  if (filter[idField]) {
    filter[idField] = new ObjectId(filter[idField]);
  }

  const idsField = '_ids';
  if (filter[idsField]) {
    filter[idField] = filter[idsField];
    delete filter[idsField];
  }

  return filter;
}

export function processFilters(filter: IWhereArgsWithSearch): IWhereArgs {
  const { _search, ...remainingFilter } = filter;
  prepareAndOrFilter(remainingFilter);
  const processedFilter = processFilterOperators(remainingFilter);

  if (_search) {
    processedFilter.$text = { $search: `${_search}` };
  }
  return processedFilter;
}

export function processSort(sort: IOrderArgs): IWhereArgs {
  return Object.keys(sort).reduce((all, field) => {
    all[field] = sort[field].toLowerCase();
    return all;
  }, {});
}
