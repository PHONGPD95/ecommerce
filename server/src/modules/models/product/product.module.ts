import { TypegooseModule } from 'nestjs-typegoose';

import { Module } from '@nestjs/common';

import { FileService } from '~modules/models/file/file.service';

import { Product } from './product.model';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [TypegooseModule.forFeature([Product])],
  providers: [ProductService, ProductResolver, FileService],
  exports: [ProductService],
})
export class ProductModule {}
