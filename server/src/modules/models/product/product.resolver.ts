import Promise from 'bluebird';
import { isEmpty } from 'lodash';
import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';
import { Container } from 'typedi';
import { IContext } from '~graphql/types/graphql-context';
import { Common } from '~modules/models/common/common.model';
import { File } from '~modules/models/file/file.model';
import { FileService } from '~modules/models/file/file.service';
import { User } from '~modules/models/user/user.model';

import { ReturnModelType } from '@typegoose/typegoose';

import { BaseProductResolver } from './product.base';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Resolver(Product)
export class ProductResolver extends BaseProductResolver {
  constructor(
    private readonly service: ProductService,
    private readonly fileService: FileService,
  ) {
    super();
    Container.set(ProductResolver, this);
  }
  
  @FieldResolver(() => User, { nullable: true })
  public async creator(
    @Root() product: ReturnModelType<typeof Product>,
    @Ctx() { loaderManager }: IContext,
  ): Promise<User> {
    if (!product.creatorId) {
      return;
    }
    const loader = loaderManager.getLoader(User);
    return loader.load(product.creatorId.toString());
  }

  @FieldResolver(() => [File])
  public async images(
    @Root() product: ReturnModelType<typeof Product>,
  ): Promise<File[]> {
    if (isEmpty(product.imageIds)) {
      return [];
    }

    const data = await Promise.map(product.imageIds, async imageId =>
      this.fileService.findFileById(imageId),
    );

    return data;
  }

  @FieldResolver(() => Common, { nullable: true })
  public async category(
    @Root() product: ReturnModelType<typeof Product>,
    @Ctx() { loaderManager }: IContext,
  ): Promise<Common> {
    if (!product.categoryId) {
      return;
    }
    const loader = loaderManager.getLoader(Common, 'key');
    return loader.load(product.categoryId.toString());
  }

  @FieldResolver(() => Common, { nullable: true })
  public async brand(
    @Root() product: ReturnModelType<typeof Product>,
    @Ctx() { loaderManager }: IContext,
  ): Promise<Common> {
    if (!product.brandId) {
      return;
    }
    const loader = loaderManager.getLoader(Common, 'key');
    return loader.load(product.brandId.toString());
  }
}
