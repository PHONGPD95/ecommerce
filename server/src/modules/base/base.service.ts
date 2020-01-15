import { ObjectId } from 'mongodb';
import { ClassType } from '~database/types';

import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class BaseService<TModel> {
  protected readonly model: ReturnModelType<ClassType<TModel>>;

  public async count(where?: any): Promise<number> {
    return this.model.find(where).countDocuments();
  }

  public async findById(_id: string): Promise<TModel> {
    return this.model.findById(_id);
  }

  public async findOne(filter?: any): Promise<TModel> {
    const { sort, where } = filter;
    return this.model.findOne(where, null, { sort });
  }

  public async findMany(filter?: any): Promise<TModel[]> {
    const { where, sort, skip, limit } = filter;
    return this.model.find(where, null, {
      skip,
      limit,
      sort,
    });
  }

  public async create(record: TModel): Promise<TModel> {
    const r = await this.model.create(record);
    if (!r) {
      throw Error();
    }

    return r;
  }

  public async updateById(_id: string, record: TModel): Promise<TModel> {
    const r = await this.model.findById(_id);
    if (!r) {
      throw Error();
    }

    Object.assign(r, record);
    await r.save();

    return r;
  }

  public async removeById(_id: string): Promise<TModel> {
    const r = await this.model.findById(_id);
    if (!r) {
      throw Error();
    }

    await r.remove();
    Object.assign(r, { _id });

    return r;
  }
}
