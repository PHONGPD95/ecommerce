import '../../alias';
import 'reflect-metadata';

import Promise from 'bluebird';
import { ObjectId } from 'mongodb';
import { shim } from 'promise.prototype.finally';

import { NestFactory } from '@nestjs/core';

import { ProductModule } from '~modules/models/product/product.module';
import { ProductService } from '~modules/models/product/product.service';

import { AppModule } from '../../app.module';
import { data } from './MOCK_DATA';

shim();

async function genarateData() {
  const app = await NestFactory.create(AppModule);
  const productService = app.select(ProductModule).get(ProductService);

  await Promise.each(data, async p => {
    await productService.create({
      ...p,
      creatorId: new ObjectId('5de0957d2db4b010615f591f'),
    });
  });
}

genarateData()
  // tslint:disable-next-line:no-console
  .catch(console.log)
  .finally(() => process.exit(0));
