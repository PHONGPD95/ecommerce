import 'antd/dist/antd.css';

import { ConfigProvider, Empty } from 'antd';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import client from '~graphql/client';
import App from '~screens/App';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <ConfigProvider
        renderEmpty={() => <Empty description="Không có dữ liệu" />}
      >
        <App />
      </ConfigProvider>
    </ApolloProvider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
