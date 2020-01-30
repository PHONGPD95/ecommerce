import { get } from 'lodash';
import { action, computed, observable } from 'mobx';
import { ErrorNoti, SuccessNoti } from '~components/UI';
import client from '~graphql/client';
import { CHANGE_PASSWORD, UPDATE_INFO } from '~graphql/mutations';
import { ME } from '~graphql/queries';
import {
    ChangePassword, ChangePasswordVariables, Me, UpdateInfo, UpdateInfoInput, UpdateInfoVariables
} from '~graphql/types';

import authStore from './authStore';

class UserStore {
  @observable
  currentUser: any = null;

  @observable
  loadingUser: boolean = false;

  @observable
  updatingUser: boolean = false;

  @computed
  get roles() {
    return this.currentUser && get(this.currentUser, "profile.roles");
  }

  @action
  getUser = async () => {
    this.loadingUser = true;

    await client
      .query<Me>({ query: ME })
      .then(res => {
        const { data } = res.data!.me;

        if (!data) {
          authStore.logout();
        } else {
          this.currentUser = data;
          this.loadingUser = false;
        }
      })
      .catch(_err => {
        authStore.logout();
      })
  };

  @action
  forgetUser() {
    this.currentUser = undefined;
  }

  @action
  update = async (record: UpdateInfoInput) => {
    const res = await client.mutate<UpdateInfo, UpdateInfoVariables>({
      mutation: UPDATE_INFO,
      variables: { record }
    });

    const { error, data } = res.data!.updateInfo;

    if (error) {
      ErrorNoti(error.message);
    } else {
      this.currentUser = data;
      SuccessNoti("Cập nhật thông tin");
    }
  };

  @action
  changePassword = async (oldPassword: string, newPassword: string) => {
    const res = await client.mutate<ChangePassword, ChangePasswordVariables>({
      mutation: CHANGE_PASSWORD,
      variables: {
        oldPassword,
        newPassword
      }
    });

    const { error, data } = res.data!.changePassword;

    if (error) {
      ErrorNoti(error.message);
    } else {
      this.currentUser = data;
      SuccessNoti("Cập nhật mật khẩu");
    }
  };
}

export default new UserStore();
