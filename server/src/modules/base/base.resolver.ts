import { FieldsByTypeName, ResolveTree } from 'graphql-parse-resolve-info';
import { pickBy, some } from 'lodash';
import {
  Arg,
  Args,
  ArgsType,
  Authorized,
  ClassType,
  ID,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
  Resolver
} from 'type-graphql';
import { TypeValueThunk } from 'type-graphql/dist/decorators/types';
import { FieldMetadata } from 'type-graphql/dist/metadata/definitions';
import { getMetadataStorage } from 'type-graphql/dist/metadata/getMetadataStorage';
import Container from 'typedi';

import {
  Field,
  FieldInfo,
  FILTER_METADATA_KEY,
  Mutation,
  Query,
  SORT_METADATA_KEY
} from '~graphql/graphql-decorators';
import { SortDirection } from '~graphql/types';

import { BaseModel } from './base.model';
import { BaseService } from './base.service';
import { invalidMutation, StandardMutationError } from './error';
import { OPERATORS_FIELDNAME, processFilters } from './utils';

export type Empty = null | undefined;
export type Status = number;

interface IOptions {
  role?: string[];
  enable?: boolean;
}

interface ICRUDOptions {
  read?: IOptions;
  create?: IOptions;
  update?: IOptions;
  remove?: IOptions;
}

interface IBaseResolverOptions {
  action?: ICRUDOptions;
}

registerEnumType(SortDirection, { name: 'SortDirection' });

function addArrayOperators(cls: ClassType, getType: TypeValueThunk) {
  Field(() => [getType()], { nullable: true })(cls.prototype, 'in');
  Field(() => [getType()], { nullable: true })(cls.prototype, 'nin');
}
function addRangeOperators(cls: ClassType, getType: TypeValueThunk) {
  Field(() => getType(), { nullable: true })(cls.prototype, 'gt');
  Field(() => getType(), { nullable: true })(cls.prototype, 'gte');
  Field(() => getType(), { nullable: true })(cls.prototype, 'lt');
  Field(() => getType(), { nullable: true })(cls.prototype, 'lte');
}

@InputType()
class IDOperatorArgs {}
addArrayOperators(IDOperatorArgs, () => ID);

@InputType()
class StringOperatorArgs {}
addArrayOperators(StringOperatorArgs, () => String);

@InputType()
class NumberOperatorArgs {}
addArrayOperators(NumberOperatorArgs, () => Number);
addRangeOperators(NumberOperatorArgs, () => Number);

@InputType()
class DateOperatorArgs {}
addRangeOperators(DateOperatorArgs, () => Date);

export function createBaseResolver<TModel extends BaseModel>(
  ModelCls: ClassType<TModel>,
  options?: IBaseResolverOptions,
) {
  const modelName = ModelCls.name;
  const {
    action: { read, create, update, remove },
  } = options;

  @InputType(`${modelName}FilterOperator`)
  class WhereFilterOperatorArgs {}

  @InputType(`${modelName}Filter`)
  class WhereFilterArgs {
    @Field(() => [ID], { nullable: true })
    public _ids: [string];

    @Field(() => WhereFilterArgs, { nullable: true })
    public AND: [WhereFilterArgs];

    @Field(() => WhereFilterArgs, { nullable: true })
    public OR: [WhereFilterArgs];

    @Field({ nullable: true })
    public _search?: string;
  }

  @InputType(`${modelName}Sort`)
  class SortFilterArgs {}

  @InputType(`${modelName}UpdateArg`)
  class UpdateField {}

  @ArgsType()
  class UpdateArgs {
    @Field()
    public _id: string;

    @Field()
    public record: UpdateField;
  }

  const fields: FieldMetadata[] = (getMetadataStorage() as any).getClassFieldMetadata(
    ModelCls,
  );
  const baseFields: FieldMetadata[] = (getMetadataStorage() as any).getClassFieldMetadata(
    BaseModel,
  );

  const notIncluedField = ['creatorId', 'customerId', 'password'];

  [...fields].forEach(field => {
    if (!some(notIncluedField, item => item === field.name)) {
      const type = field.getType();
      if (field.typeOptions && field.typeOptions.array) {
        Field(() => [type], { nullable: true })(
          UpdateField.prototype,
          field.name,
        );
      } else {
        Field(() => type, { nullable: true })(
          UpdateField.prototype,
          field.name,
        );
      }
    }
  });

  let hasOperator = false;
  [...fields, ...baseFields].forEach(field => {
    const filterEnabled = Reflect.getMetadata(
      FILTER_METADATA_KEY,
      ModelCls.prototype,
      field.name,
    );
    const sortEnabled = Reflect.getMetadata(
      SORT_METADATA_KEY,
      ModelCls.prototype,
      field.name,
    );

    if (filterEnabled) {
      Field(field.getType, { nullable: true })(
        WhereFilterArgs.prototype,
        field.name,
      );
      if (field.getType() === ID) {
        hasOperator = true;
        Field(() => IDOperatorArgs, { nullable: true })(
          WhereFilterOperatorArgs.prototype,
          field.name,
        );
      }
      if (field.getType() === String) {
        hasOperator = true;
        Field(() => StringOperatorArgs, { nullable: true })(
          WhereFilterOperatorArgs.prototype,
          field.name,
        );
      }
      if (field.getType() === Date) {
        hasOperator = true;
        Field(() => DateOperatorArgs, { nullable: true })(
          WhereFilterOperatorArgs.prototype,
          field.name,
        );
      }
      if (field.getType() === Number) {
        hasOperator = true;
        Field(() => NumberOperatorArgs, { nullable: true })(
          WhereFilterOperatorArgs.prototype,
          field.name,
        );
      }
    }
    if (sortEnabled) {
      Field(() => SortDirection, { nullable: true })(
        SortFilterArgs.prototype,
        field.name,
      );
    }
  });

  if (hasOperator) {
    Field(() => WhereFilterOperatorArgs, { nullable: true })(
      WhereFilterArgs.prototype,
      OPERATORS_FIELDNAME,
    );
  }

  const processQueryFields = (
    fieldsByTypeName: FieldsByTypeName,
  ): { [field: string]: number } => {
    const keys = Object.keys(fieldsByTypeName);
    if (!keys.length) {
      return null;
    }
    const queryFields = fieldsByTypeName[keys[0]];
    return Object.keys(fieldsByTypeName[keys[0]]).reduce((all, field) => {
      const { name, fieldsByTypeName: childFieldsByTypeName } = queryFields[
        field
      ];
      const processedQueryChildFields =
        processQueryFields(childFieldsByTypeName) || {};
      const childKeys = Object.keys(processedQueryChildFields);
      if (!childKeys.length) {
        all[name] = 1;
      } else {
        childKeys.forEach(key => {
          all[`${name}.${key}`] = 1;
        });
      }
      return all;
    }, {});
  };

  @ArgsType()
  class FindOneFilterArgs {
    @Field(() => WhereFilterArgs, { nullable: true })
    public where: WhereFilterArgs;

    @Field(() => SortFilterArgs, { nullable: true })
    public sort: SortFilterArgs;
  }

  @ArgsType()
  class FindManyFilterArgs {
    @Field(() => Int, { nullable: true })
    public skip?: number = 0;

    @Field(() => Int, { nullable: true })
    public limit?: number;

    @Field(() => WhereFilterArgs, { nullable: true })
    public where?: WhereFilterArgs;

    @Field(() => SortFilterArgs, { nullable: true })
    public sort?: SortFilterArgs;
  }

  @ArgsType()
  class CountArgs {
    @Field(() => WhereFilterArgs, { nullable: true })
    public where?: WhereFilterArgs;
  }

  @ObjectType(`${modelName}BasePayload`)
  class BasePayload {
    @Field(() => ModelCls, { nullable: true })
    public data?: TModel;

    @Field({ nullable: true })
    public error?: StandardMutationError;
  }

  @Resolver({ isAbstract: true })
  class BaseResolver {
    protected readonly service: BaseService<TModel>;
    constructor() {
      Container.set(BaseResolver, this);
    }

    @Authorized(read.role)
    @Query(() => Int, {
      name: `count${modelName}`,
      nullable: true,
      enable: read.enable,
    })
    public async count(@Args() { where: filter }: CountArgs): Promise<number> {
      const where = processFilters(pickBy(filter, val => !!val));
      return this.service.count(where);
    }

    @Authorized(read.role)
    @Query(() => ModelCls, {
      name: `find${modelName}ById`,
      nullable: true,
      enable: read.enable,
    })
    public async findById(@Arg('_id') _id: string): Promise<TModel> {
      return this.service.findById(_id);
    }

    @Authorized(read.role)
    @Query(() => ModelCls, {
      nullable: true,
      name: `findOne${modelName}`,
      enable: read.enable,
    })
    public async findOne(
      @Args() args: FindOneFilterArgs,
      @FieldInfo() info: ResolveTree,
    ): Promise<TModel> {
      const pick = processQueryFields(info.fieldsByTypeName);

      const { where: filter, sort } = args;

      const where = processFilters(pickBy(filter, val => !!val));
      return this.service.findOne({ where, pick, ...(sort && { sort }) });
    }

    @Authorized(read.role)
    @Query(() => [ModelCls], {
      name: `findMany${modelName}`,
      enable: read.enable,
    })
    public async findMany(
      @Args() args: FindManyFilterArgs,
      @FieldInfo() info: ResolveTree,
    ): Promise<TModel[]> {
      const pick = processQueryFields(info.fieldsByTypeName);

      const { skip, limit, sort, where: filter } = args;

      const where = processFilters(pickBy(filter, val => !!val));
      return this.service.findMany({
        where,
        pick,
        ...(sort && { sort }),
        ...(skip && { skip }),
        ...(limit && { limit }),
      });
    }

    @Authorized(create.role)
    @Mutation(() => BasePayload, {
      name: `create${modelName}`,
      enable: create.enable,
    })
    public async create(
      @Arg('record', () => ModelCls) record: TModel,
    ): Promise<BasePayload> {
      let data;

      try {
        data = this.service.create(record as TModel);
      } catch (err) {
        return invalidMutation;
      }

      return data;
    }

    @Authorized(update.role)
    @Mutation(() => BasePayload, {
      name: `update${modelName}ById`,
      enable: update.enable,
    })
    public async updateById(
      @Args() { _id, record }: UpdateArgs,
    ): Promise<BasePayload> {
      let data;

      try {
        data = this.service.updateById(_id, record as TModel);
      } catch (err) {
        return invalidMutation;
      }

      return data;
    }

    @Authorized(remove.role)
    @Mutation(() => BasePayload, {
      name: `remove${modelName}ById`,
      enable: remove.enable,
    })
    public async removeById(@Arg('_id') _id: string): Promise<BasePayload> {
      let data;

      try {
        data = this.service.removeById(_id);
      } catch (err) {
        return invalidMutation;
      }

      return data;
    }
  }

  return {
    BaseResolver: BaseResolver as any,
    WhereFilterArgs: WhereFilterArgs as any,
    SortFilterArgs: SortFilterArgs as any,
    FindOneFilterArgs: FindOneFilterArgs as any,
    FindManyFilterArgs: FindManyFilterArgs as any,
  };
}
