export type Maybe<T> = T | null;
export type FilterOperator = 'in' | 'nin' | 'gt' | 'gte' | 'lt' | 'lte';
export type ValueType = string | number;
export type RangeType = number | Date;
export interface IWhereOperator {
  in?: Maybe<ValueType[]>;
  nin?: Maybe<ValueType[]>;
  gt?: Maybe<RangeType>;
  gte?: Maybe<RangeType>;
  lt?: Maybe<RangeType>;
  lte?: Maybe<RangeType>;
}
export interface IWhereArgs {
  _ids?: Maybe<string[]>;
  AND?: Maybe<IWhereArgs[]>;
  OR?: Maybe<IWhereArgs[]>;
  [key: string]: any;
  _operators?: {
    [key: string]: Maybe<IWhereOperator>;
  };
}

export type IWhereArgsWithSearch = IWhereArgs & { _search?: string };

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface IOrderArgs {
  [key: string]: SortDirection;
}

export interface IFindOneFilter {
  where?: IWhereArgs;
  order?: IOrderArgs;
}

export interface IFindManyFilter extends IFindOneFilter {
  take?: number;
  skip?: number;
}
