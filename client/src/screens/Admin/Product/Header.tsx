import { Button, Icon, Input, PageHeader } from 'antd';
import { observer } from 'mobx-react';
import React, { FC } from 'react';

import { Filter, SelectCommon } from '~components/UI';

import store from './store';

const ProductHeader: FC = observer(() => {
  const { setSearchText, setWhere, setModalVisible } = store;

  const configFilter = [
    {
      name: "categoryId",
      label: "Nhóm sản phẩm",
      component: SelectCommon,
      componentProps: {
        type: "product_category",
        placeholder: "Chọn nhóm sản phẩm",
        allowClear: true
      }
    },
    {
      name: "brandId",
      label: "Thương hiệu",
      component: SelectCommon,
      componentProps: {
        type: "product_brand",
        placeholder: "Chọn thương hiệu",
        allowClear: true
      }
    }
  ];

  return (
    <PageHeader
      style={{ background: "#fff", marginBottom: 8 }}
      title="Danh sách Sản phẩm"
      extra={[
        <Input
          key="search"
          suffix={<Icon type="search" />}
          placeholder="Tìm kiếm..."
          allowClear={true}
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />,
        <Filter key="filter" filteConfig={configFilter} onFilter={setWhere} />,
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

export default ProductHeader;
