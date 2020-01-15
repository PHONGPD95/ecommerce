import { Button, Dropdown, Icon, Menu, Popconfirm } from 'antd';
import { observer } from 'mobx-react';
import React, { FC } from 'react';

import { Common } from '~graphql/types';

import store from './store';

interface Props {
  text: any;
  record: Common;
}

const CellActionRenderer: FC<Props> = observer(({ text, record }) => {
  const moreActions = (
    <Menu>
      <Menu.Item key="1" style={{ color: "red" }}>
        <Popconfirm title="Xóa?" onConfirm={() => store.remove(text)}>
          <Icon type="delete" />
          Xoá
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  return (
    <Button.Group>
      <Button
        icon="edit"
        type="primary"
        onClick={() => store.setModalVisible(record)}
      />
      <Dropdown overlay={moreActions}>
        <Button icon="ellipsis" type="default" />
      </Dropdown>
    </Button.Group>
  );
});

export default CellActionRenderer;
