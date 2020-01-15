import { Row } from 'antd';
import { observer } from 'mobx-react';
import React, { FC, useEffect } from 'react';

import ChatEditor from './ChatEditor';
import ChatList from './ChatList';
import store from './store';

const Chat: FC = observer(() => {
  const { loadMessages, subscribeMessage } = store;
  useEffect(() => {
    loadMessages(0);
    subscribeMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row
      type="flex"
      style={{
        flexFlow: "column",
        height: "calc(100vh - 96px)",
        background: "#fff"
      }}
    >
      <ChatList />
      <ChatEditor />
    </Row>
  );
});

export default Chat;
