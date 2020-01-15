import { action, observable } from 'mobx';

export class LayoutStore {
  @observable
  isMobile: boolean = window.innerWidth < 768;

  @observable
  isSiderCollapse: boolean = true;

  @observable
  isSpinnerLoad: boolean = false;

  @observable
  isShoppingCartCollapse: boolean = false;

  @action
  setMobile = boolean => {
    this.isMobile = boolean;
  };

  @action
  toggleSider = (isToggle: boolean | null = null) => {
    if (isToggle === null) {
      this.isSiderCollapse = !this.isSiderCollapse;
    } else {
      this.isSiderCollapse = isToggle;
    }
  };

  @action
  toggleSpinner = (isToggle: boolean | null = null) => {
    if (isToggle === null) {
      this.isSpinnerLoad = !this.isSpinnerLoad;
    } else {
      this.isSpinnerLoad = isToggle;
    }
  };

  @action
  toggleShoppingCart = (isToggle: boolean | null = null) => {
    if (isToggle === null) {
      this.isShoppingCartCollapse = !this.isShoppingCartCollapse;
    } else {
      this.isShoppingCartCollapse = isToggle;
    }
  };
}

export default new LayoutStore();
