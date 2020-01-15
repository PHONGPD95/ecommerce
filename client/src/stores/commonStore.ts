import { action, observable, reaction } from 'mobx';

export class CommonStore {
  @observable
  appLoaded: boolean = false;

  @observable
  token: string | undefined | null = window.localStorage.getItem("token");

  constructor() {
    reaction(
      () => this.token,
      token => {
        if (token) {
          window.localStorage.setItem("token", token);
        } else {
          window.localStorage.removeItem("token");
        }
      }
    );
  }

  @action
  setToken = (token: string | undefined | null) => {
    this.token = token;
  };

  @action
  setAppLoaded = () => {
    this.appLoaded = true;
  };
}

export default new CommonStore();
