import { action, observable } from 'mobx';

export interface User {
  name: string;
  phone: string;
  email: string;
  address: string;
}

class OrderStore {
  @observable
  user?: User;

  @action
  handleSubmit = (record: User) => {
    console.log(record);
  };
}

export default new OrderStore();
