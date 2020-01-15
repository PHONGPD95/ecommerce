import { ObjectId } from 'mongodb';
import { ClassType } from '~database/types';
import { BaseModel } from '~modules/base/base.model';

import { getModelForClass, ReturnModelType } from '@typegoose/typegoose';

import DataLoader = require('dataloader');
export class DbLoader<T extends BaseModel> {
  private readonly model: ReturnModelType<ClassType<T>>;
  private readonly loader: DataLoader<string, T>;
  private readonly fieldName: string;

  constructor(Model: ClassType<T>, fieldName: string = '_id') {
    this.model = getModelForClass(Model);
    this.loader = new DataLoader<string, T>(this._load);
    this.fieldName = fieldName;
  }

  public load = async (key: string): Promise<T> => {
    return this.loader.load(key);
  };

  public loadMany = async (keys: string[]): Promise<T[]> => {
    return this.loader.loadMany(keys);
  };

  private _load = async (keys: string[]): Promise<T[]> => {
    const ids =
      this.fieldName === '_id' ? keys.map(key => new ObjectId(key)) : keys;
    const data = await this.model.find({
      [this.fieldName]: { $in: ids },
    });
    const dataMap = data.reduce<{ [key: string]: T }>((all, item) => {
      const fieldValue = item[this.fieldName].toString();
      all[fieldValue] = item;
      return all;
    }, {});

    return keys.map(key => dataMap[key]);
  };
}

export class DbLoaderManager {
  private loaders = new Map<ClassType<BaseModel>, DbLoader<any>>();

  public getLoader<T extends BaseModel>(
    Model: ClassType<T>,
    fieldName?: string,
  ) {
    let loader: DbLoader<T> = this.loaders.get(Model);
    if (!loader) {
      loader = new DbLoader(Model, fieldName);
      this.loaders.set(Model, loader);
    }

    return loader;
  }
}
