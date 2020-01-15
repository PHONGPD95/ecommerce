import { action, observable, reaction } from 'mobx';
import { ErrorNoti } from '~components/UI';
import client from '~graphql/client';
import { FIND_ONE_PRODUCT } from '~graphql/queries';
import {
    FindManyProductVariables, FindOneProduct, FindOneProductVariables, Product
} from '~graphql/types';

export class DetailStore {
  @observable
  loading: boolean = true;

  @observable
  product?: Product = undefined;

  @observable
  filter?: FindManyProductVariables = undefined;

  constructor() {
    const width = window.innerWidth;

    let limit = 3;
    if (1200 < width && width < 1600) {
      limit = 4;
    } else if (1600 < width) {
      limit = 5;
    }

    this.filter = { limit };

    reaction(
      () => this.product,
      product => product && this.setFilter(product)
    );
  }

  @action
  init = async (sku: string) => {
    const { data } = await client.query<
      FindOneProduct,
      FindOneProductVariables
    >({
      query: FIND_ONE_PRODUCT,
      variables: { where: { sku } }
    });

    if (!data.findOneProduct) {
      ErrorNoti("Không tìm thấy sản phẩm");
    } else {
      this.product = data.findOneProduct;
    }
    this.loading = false;
  };

  @action
  setFilter = async (product: Product) => {
    const where = {
      categoryId: product.categoryId,
      brandId: product.brandId,
      _operators: { sku: { nin: [product.sku] } }
    };

    this.filter = { ...this.filter, where };
  };
}

export default new DetailStore();
