import { BackTop, Layout, Spin } from 'antd';
import { observer } from 'mobx-react';
import React, { FC, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router';
import ErrorBoundary from '~components/Layout/ErrorBoundary';
import Header from '~components/Layout/Header';
import Sider from '~components/Layout/Sider';
import ShoppingCart from '~components/ShoppingCart/ShoppingCart';
import { useStores } from '~stores';

import Login from './Public/Login/Login';
import Routes from './Routes';

const { Content } = Layout;

const ScreenRoutes: FC = observer(() => {
  const {
    userStore: { currentUser },
    layoutStore: { isMobile, isSiderCollapse }
  } = useStores();

  const content = { marginLeft: 0 };

  if (!isMobile && isSiderCollapse) {
    content.marginLeft = 80;
  } else if (!isMobile && !isSiderCollapse) {
    content.marginLeft = 200;
  }

  return (
    <Layout style={{ ...content }}>
      <Header />
      <Content
        style={{
          padding: currentUser ? "16px 8px" : undefined
        }}
      >
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </Content>
    </Layout>
  );
});

const App: FC = observer(() => {
  const {
    commonStore: { appLoaded, setAppLoaded, token },
    userStore: { getUser }
  } = useStores();

  useEffect(() => {
    if (!appLoaded && token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const location = useLocation();

  return (
    <Spin spinning={!appLoaded}>
      <Layout
        style={{
          background: "transparent",
          minHeight: "100vh",
          height: "100%"
        }}
      >
        {location.pathname !== "/login" && <Sider />}
        <Switch>
          <Route path="/login" component={Login} />
          <ScreenRoutes />
        </Switch>
        <ShoppingCart />
        <BackTop />
      </Layout>
    </Spin>
  );
});

export default App;
