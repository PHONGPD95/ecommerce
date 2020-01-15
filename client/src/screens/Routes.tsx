import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import { useStores } from 'stores';

import AdminBrand from './Admin/Brand/Brand';
import AdminCategory from './Admin/Category/Category';
import AdminChat from './Admin/Chat/Chat';
import AdminDashboard from './Admin/Dashboard/Dashboard';
import AdminProduct from './Admin/Product/Product';
import AdminUser from './Admin/User/User';
import Detail from './Public/Detail/Detail';
import Home from './Public/Home/Home';
import Order from './Public/Order/Order';
import Product from './Public/Product/Product';

export interface IRoute extends RouteProps {
  path: string;
  isPrivate?: boolean;
  name: string;
  icon?: string;
  hide?: boolean;
  subRoutes?: IRoute[];
}

export const routes: IRoute[] = [
  {
    path: "/",
    exact: true,
    name: "Trang chủ",
    icon: "home",
    component: Home
  },
  {
    path: "/detail",
    name: "Sản phẩm",
    hide: true,
    component: Detail
  },
  {
    path: "/product",
    name: "Tất cả sản phẩm",
    icon: "unordered-list",
    component: Product
  },
  {
    path: "/product",
    name: "Nhóm sản phẩm",
    icon: "skin",
    component: Product,
    subRoutes: [
      {
        path: "?categoryId=jacket",
        name: "Jacket",
        component: Product
      },
      {
        path: "?categoryId=jogger",
        name: "Jogger",
        component: Product
      },
      {
        path: "?categoryId=t-shirt",
        name: "T-shirt",
        component: Product
      }
    ]
  },
  {
    path: "/product",
    name: "Thương hiệu",
    icon: "tags",
    component: Product,
    subRoutes: [
      {
        path: "?brandId=nike",
        name: "Nike",
        component: Product
      },
      {
        path: "?brandId=adidas",
        name: "Adidas",
        component: Product
      },
      {
        path: "?brandId=puma",
        name: "Puma",
        component: Product
      }
    ]
  },
  {
    path: "/order",
    name: "Thanh toán",
    hide: true,
    component: Order
  },
  {
    path: "/admin",
    exact: true,
    isPrivate: true,
    name: "Trang quản trị",
    icon: "dashboard",
    component: AdminDashboard
  },
  {
    path: "/admin/product",
    isPrivate: true,
    name: "Sản phẩm",
    icon: "unordered-list",
    component: AdminProduct
  },
  {
    path: "/admin/category",
    isPrivate: true,
    name: "Nhóm sản phẩm",
    icon: "skin",
    component: AdminCategory
  },
  {
    path: "/admin/brand",
    isPrivate: true,
    name: "Thương hiệu",
    icon: "tags",
    component: AdminBrand
  },
  {
    path: "/user",
    isPrivate: true,
    name: "Thông tin cá nhân",
    icon: "user",
    component: AdminUser
  },
  {
    path: "/admin/chat",
    isPrivate: true,
    name: "Trò chuyện",
    icon: "message",
    component: AdminChat
  }
];

const PrivateRoute: FC<RouteProps> = observer(({ component, ...rest }) => {
  const {
    userStore: { currentUser }
  } = useStores();

  if (currentUser) {
    return <Route component={component} {...rest} />;
  }

  return (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: rest.location }
      }}
    />
  );
});

const Routes = () => (
  <Switch>
    {routes.map(({ isPrivate, name, ...route }) =>
      isPrivate ? (
        <PrivateRoute key={name} {...route} />
      ) : (
        <Route key={name} {...route} />
      )
    )}
  </Switch>
);

export default Routes;
