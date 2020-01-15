import { action, computed, observable } from 'mobx';
import { Product } from '~graphql/types';

export interface ProductCart extends Product {
  amount: number;
}

export class ShoppingCartStore {
  @observable
  cart: ProductCart[] = [];

  @computed
  get total() {
    const item = this.cart.reduce((all, item) => {
      all += item.amount;
      return all;
    }, 0);
    const price = this.cart.reduce((all, item) => {
      all += item.price * item.amount;
      return all;
    }, 0);
    return { item, price };
  }

  @action
  addItem = (product: Product, amount: number = 1) => {
    const index = this.cart.findIndex(item => item._id === product._id);

    if (index > -1) {
      const total = (this.cart[index].amount += amount);

      if (total > 0) {
        this.cart = [
          ...this.cart.slice(0, index),
          {
            ...product,
            amount: total
          },
          ...this.cart.slice(index + 1)
        ];
      } else {
        this.removeItem(product);
      }
    } else {
      this.cart = [
        ...(this.cart || []),
        {
          ...product,
          amount
        }
      ];
    }
  };

  @action
  removeItem = (product: Product) => {
    this.cart = this.cart.filter(item => item._id !== product._id);
  };
}

export default new ShoppingCartStore();
