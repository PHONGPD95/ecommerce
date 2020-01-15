import { UploadFile } from 'antd/lib/upload/interface';
import { debounce } from 'lodash';
import { action, observable } from 'mobx';

import { ErrorNoti, SuccessNoti } from '~components/UI';
import client from '~graphql/client';
import { CREATE_PRODUCT, REMOVE_PRODUCT_BY_ID, UPDATE_PRODUCT_BY_ID } from '~graphql/mutations';
import {
  CreateProduct,
  CreateProductVariables,
  FindManyProductVariables,
  Product,
  ProductFilter,
  ProductInput,
  ProductUpdateArg,
  RemoveProductById,
  RemoveProductByIdVariables,
  SortDirection,
  UpdateProductById,
  UpdateProductByIdVariables
} from '~graphql/types';

export class ProductStore {
  @observable
  selectedItem?: Product = undefined;

  @observable
  filter: FindManyProductVariables = {
    limit: 50,
    sort: { createdAt: "DESC" as SortDirection }
  };

  @observable
  fileList: UploadFile<any>[] = [];

  @observable
  modalVisible: boolean = false;

  @observable
  initFilter: boolean = false;

  @action
  refresh() {
    this.filter = {
      ...this.filter,
      limit: 50
    };
  }

  @action
  setSearchText = debounce(
    (text?: string) => {
      const where: ProductFilter = { ...this.filter.where, _search: text };

      this.filter = { ...this.filter, where };
    },
    500,
    { leading: false, trailing: true }
  );

  @action
  setWhere = (whereFilter: any) => {
    let where: ProductFilter = { ...this.filter.where, ...whereFilter };

    this.filter = { ...this.filter, where };
    this.initFilter = true;
  };

  @action
  setModalVisible = (item: Product | undefined = undefined) => {
    if (item && item.images) {
      this.fileList = item!.images!.map(img => {
        const file: UploadFile<any> = {
          uid: img.id,
          size: 0,
          name: img.id,
          type: "",
          url: img.path!
        };
        return file;
      });
    } else {
      this.fileList = [];
    }
    this.selectedItem = item;
    this.modalVisible = !this.modalVisible;
  };

  @action
  setFileList = fileList => (this.fileList = fileList);

  @action
  create = async (record: ProductInput) => {
    const { data } = await client.mutate<CreateProduct, CreateProductVariables>(
      {
        mutation: CREATE_PRODUCT,
        variables: { record }
      }
    );

    const { error } = data!.createProduct;

    if (error) {
      ErrorNoti(error.message);
    } else {
      SuccessNoti("Tạo sản phẩm");
      this.refresh();
    }
  };

  @action
  update = async (_id: string, record: ProductUpdateArg) => {
    const imageIds = this.fileList.map(f => f.uid);

    const { data } = await client.mutate<
      UpdateProductById,
      UpdateProductByIdVariables
    >({
      mutation: UPDATE_PRODUCT_BY_ID,
      variables: { _id, record: { ...record, imageIds } }
    });

    const { error } = data!.updateProductById;

    if (error) {
      ErrorNoti(error.message);
    } else {
      SuccessNoti("Cập nhật sản phẩm");
      this.refresh();
    }
  };

  @action
  remove = async (_id: string) => {
    const { data } = await client.mutate<
      RemoveProductById,
      RemoveProductByIdVariables
    >({
      mutation: REMOVE_PRODUCT_BY_ID,
      variables: { _id }
    });

    const { error } = data!.removeProductById;

    if (error) {
      ErrorNoti(error.message);
    } else {
      SuccessNoti("Xoá sản phẩm");
      this.refresh();
    }
  };
}

export default new ProductStore();
