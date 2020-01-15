import { Button, Icon, Input, PageHeader } from 'antd';
import { observer } from 'mobx-react';
import React, { FC } from 'react';

import store from './store';

const BrandHeader: FC = observer(() => {
  const { setSearchText, setModalVisible } = store;

  return (
    <PageHeader
      style={{ background: "#fff", marginBottom: 8 }}
      title="Danh sách Thương hiệu"
      extra={[
        <Input
          key="search"
          suffix={<Icon type="search" />}
          placeholder="Tìm kiếm..."
          allowClear={true}
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />,
        <Button
          key="create"
          type="primary"
          icon="plus"
          onClick={() => setModalVisible()}
        >
          Tạo mới
        </Button>
      ]}
    />
  );
});

export default BrandHeader;
