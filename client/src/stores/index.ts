import { createContext, useContext } from 'react';

import authStore from './authStore';
import commonStore from './commonStore';
import layoutStore from './layoutStore';
import shoppingCartStore from './shoppingCartStore';
import userStore from './userStore';

export const storesContext = createContext({
  authStore,
  commonStore,
  shoppingCartStore,
  layoutStore,
  userStore
});

export const useStores = () => useContext(storesContext);
