import { debounce } from 'lodash';
import { action, observable } from 'mobx';
import { ErrorNoti, SuccessNoti } from '~components/UI';
import client from '~graphql/client';
import { CREATE_COMMON, REMOVE_COMMON_BY_ID, UPDATE_COMMON_BY_ID } from '~graphql/mutations';
import {
    Common, CommonFilter, CommonInput, CommonUpdateArg, CreateCommon, CreateCommonVariables,
    FindManyCommonVariables, RemoveCommonById, RemoveCommonByIdVariables, SortDirection,
    UpdateCommonById, UpdateCommonByIdVariables
} from '~graphql/types';

export class BrandStore {
  @observable
  selectedItem?: Common = undefined;

  @observable
  filter: FindManyCommonVariables = {
    limit: 50,
    where: { type: "product_brand" },
    sort: { createdAt: 'DESC' as SortDirection }
  };

  @observable
  modalVisible: boolean = false;

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
      const where: CommonFilter = { ...this.filter.where, _search: text };

      this.filter = { ...this.filter, where };
    },
    500,
    { leading: false, trailing: true }
  );

  @action
  setModalVisible = (item: Common | undefined = undefined) => {
    this.selectedItem = item;
    this.modalVisible = !this.modalVisible;
  };

  @action
  create = async (record: CommonInput) => {
    const { data } = await client.mutate<CreateCommon, CreateCommonVariables>({
      mutation: CREATE_COMMON,
      variables: { record }
    });

    const { error } = data!.createCommon;

    if (error) {
      ErrorNoti(error.message);
    } else {
      SuccessNoti("Tạo thương hiệu");
      this.refresh();
    }
  };

  @action
  update = async (_id: string, record: CommonUpdateArg) => {
    const { data } = await client.mutate<
      UpdateCommonById,
      UpdateCommonByIdVariables
    >({
      mutation: UPDATE_COMMON_BY_ID,
      variables: { _id, record }
    });

    const { error } = data!.updateCommonById;

    if (error) {
      ErrorNoti(error.message);
    } else {
      SuccessNoti("Cập nhật thương hiệu");
      this.refresh();
    }
  };

  @action
  remove = async (_id: string) => {
    const { data } = await client.mutate<
      RemoveCommonById,
      RemoveCommonByIdVariables
    >({
      mutation: REMOVE_COMMON_BY_ID,
      variables: {
        _id
      }
    });

    const { error } = data!.removeCommonById;

    if (error) {
      ErrorNoti(error.message);
    } else {
      SuccessNoti("Xoá thương hiệu");
      this.refresh();
    }
  };
}

export default new BrandStore();
