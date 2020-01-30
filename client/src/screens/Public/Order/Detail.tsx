import { Descriptions, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useStores } from '~stores';
import { ProductCart } from '~stores/shoppingCartStore';
import { CURRENCY_FORMAT, formatNumber } from '~utils/formatNumber';

import store from './store';

const StyledTitle = styled.div`
  color: rgba(0, 0, 0, 0.85);
  font-weight: bold;
  font-size: 16px;
  line-height: 1.5;
  margin: 16px 0;
`;

const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Detail = observer(() => {
  const {
    shoppingCartStore: { cart, total }
  } = useStores();
  const { customerInfo } = store;

  const columns: ColumnProps<ProductCart>[] = [
    {
      title: "STT",
      dataIndex: "",
      render: (_value, _data, index) => index + 1
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "display"
    },
    {
      title: "Giá",
      dataIndex: "price",
      align: "right",
      render: value => formatNumber(value, CURRENCY_FORMAT)
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      align: "right"
    },
    {
      title: "Tạm tính",
      dataIndex: "",
      align: "right",
      render: (_value, data) =>
        formatNumber(
          get(data, "price", 0) * get(data, "amount", 0),
          CURRENCY_FORMAT
        )
    }
  ];

  return (
    <Fragment>
      <Descriptions title="Thông tin cá nhân" column={2}>
        <Descriptions.Item label="Fullname" span={2}>
          {get(customerInfo, "fullname", "")}
        </Descriptions.Item>
        <Descriptions.Item label="Phone" span={1}>
          +84 {get(customerInfo, "phone", "")}
        </Descriptions.Item>
        <Descriptions.Item label="Email" span={1}>
          {get(customerInfo, "email", "")}
        </Descriptions.Item>
        <Descriptions.Item label="Address" span={2}>
          {get(customerInfo, "address", "")}
        </Descriptions.Item>
      </Descriptions>
      <StyledTitle>Giỏ hàng</StyledTitle>
      <Table
        columns={columns}
        dataSource={cart}
        rowKey="_id"
        pagination={false}
        footer={() => (
          <StyledFooter>
            <div>Tổng tiền</div>
            <div>{formatNumber(total.price, CURRENCY_FORMAT)}</div>
          </StyledFooter>
        )}
      />
    </Fragment>
  );
});

export default Detail;
