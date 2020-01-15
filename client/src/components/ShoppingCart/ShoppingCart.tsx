import { Button, Drawer } from 'antd';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useStores } from '~stores';
import { CURRENCY_FORMAT, formatNumber } from '~utils/formatNumber';

import List from './List';

const StyledPrice = styled.div`
  color: #5b5a5e;
  font-size: 18px;
`;

const StyledFooter = styled.div`
  box-sizing: border-box;
  padding: 5%;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  background-color: #001529;
`;

const StyledTotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledTitle = styled.div`
  font-size: 18px;
  color: #fff;
  text-transform: uppercase;
`;

const StyledButton = styled(Button)`
  color: #ececec;
  outline-color: #5b5a5e;
  margin-top: 20px;
`;

const ShoppingCart: FC = observer(() => {
  const {
    layoutStore: { isShoppingCartCollapse, toggleShoppingCart },
    shoppingCartStore: { total }
  } = useStores();

  return (
    <Drawer
      title="Giỏ hàng"
      placement="right"
      width={window.innerWidth > 640 ? 520 : "100%"}
      onClose={() => toggleShoppingCart()}
      visible={isShoppingCartCollapse}
    >
      <List />
      <StyledFooter>
        <StyledTotal>
          <StyledTitle>Tổng tiền:</StyledTitle>
          <StyledPrice style={{ color: "#eabf00" }}>
            {formatNumber(get(total, "price", 0), CURRENCY_FORMAT)}
          </StyledPrice>
        </StyledTotal>
        <Link to="/order">
          <StyledButton
            type="danger"
            disabled={total.price <= 0}
            block={true}
            size="large"
            onClick={() => toggleShoppingCart()}
          >
            Thanh toán
          </StyledButton>
        </Link>
      </StyledFooter>
    </Drawer>
  );
});

export default ShoppingCart;
