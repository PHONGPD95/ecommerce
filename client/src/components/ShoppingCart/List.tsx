import { List } from 'antd';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import styled from 'styled-components';
import { useStores } from '~stores';

import Item from './Item';

const StyledMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: #b9beca;
`;

const ShoppingCartList: FC = observer(() => {
  const {
    shoppingCartStore: { cart }
  } = useStores();

  if (cart.length === 0)
    return <StyledMessage>Không có sản phẩm</StyledMessage>;

  return (
    <List
      itemLayout="horizontal"
      dataSource={cart}
      renderItem={item => <Item data={item} />}
    />
  );
});

export default ShoppingCartList;
