import { message } from 'antd';
import { action, observable } from 'mobx';
import client from '~graphql/client';
import { CREATE_ORDER } from '~graphql/mutations/createOrder';
import { CreateOrder, CreateOrderVariables, OrderInput } from '~graphql/types';
import shoppingCartStore from '~stores/shoppingCartStore';

export interface CustomerInfo {
  fullname: string;
  phone: string;
  email: string;
  address: string;
}

class OrderStore {
  @observable
  customerInfo?: CustomerInfo;

  @observable
  isValid: boolean = false;

  @observable
  currentStep: number = 0;

  @observable
  status: string = "process";

  @action
  setCurrentStep = step => {
    this.currentStep = step;
  };

  @action
  setCustomerInfo = (customerInfo: CustomerInfo) => {
    this.customerInfo = customerInfo;
    this.setCurrentStep(this.currentStep + 1);
  };

  @action
  setIsValid = isValid => {
    this.isValid = isValid;
  };

  @action
  handleSubmit = async () => {
    const { cart: shoppingCart, total, clearCart } = shoppingCartStore;

    const cart = shoppingCart.map(({ sku, price, discount, amount }) => {
      const total = price * amount;
      return {
        sku,
        price,
        discount,
        amount,
        total: total - total * discount
      };
    });

    const { data } = await client.mutate<CreateOrder, CreateOrderVariables>({
      mutation: CREATE_ORDER,
      variables: {
        record: { ...this.customerInfo, cart, total: total.price } as OrderInput
      }
    });

    const { error } = data!.createOrder;
    if (error) {
      message.error(error.message);
      this.status = "error";
    } else {
      this.setCurrentStep(3);
      clearCart();
    }
  };
}

export default new OrderStore();
