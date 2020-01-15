import { Button, Select } from 'antd';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useStores } from '~stores';
import { CURRENCY_FORMAT, formatNumber } from '~utils/formatNumber';

import store from './store';

const StyledContainer = styled.div`
  display: flex;
  flex: 1;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  padding: 24px 10%;
  height: 100%;
  background: #fff;
`;

const StyledName = styled.h3`
  font-size: 22px;
  width: 100%;
  text-align: center;
  margin-bottom: 4px;
`;

const StyledBrand = styled.p`
  font-size: 22px;
  width: 100%;
  text-align: center;
  margin-bottom: 16px;

  a {
    color: #b9beca;
  }
`;

const StyledPrice = styled.h3`
  font-size: 20px;
  width: 100%;
  text-align: center;
  font-weight: bold;
  padding: 15px 0px 13px 0px;
  margin-bottom: 16px;
  border-top: 2px solid #000;
  border-bottom: 1px solid #000;
`;

const Info: FC = observer(() => {
  const {
    shoppingCartStore: { addItem }
  } = useStores();
  const { product } = store;
  const [amount, setAmount] = useState(0);

  const handleSelect = value => {
    setAmount(value);
  };

  const handleClick = () => {
    addItem(product!, amount);
  };

  const amountArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <StyledContainer>
      <StyledName>{get(product, "display", "")}</StyledName>
      <StyledBrand>
        <Link to={`/brand/${get(product, "brandId", "")}`}>
          {get(product, "brand.value", "")}
        </Link>
      </StyledBrand>
      <StyledPrice>
        {formatNumber(get(product, "price", 0), CURRENCY_FORMAT)}
      </StyledPrice>
      <Select
        allowClear
        onChange={handleSelect}
        placeholder="Chọn số lượng"
        style={{ width: "100%", marginBottom: 16 }}
      >
        {amountArr.map(item => (
          <Select.Option key={item} value={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
      <Button
        type="primary"
        onClick={handleClick}
        disabled={amount < 1 ? true : false}
        block
      >
        Thêm vào giỏ hàng
      </Button>
    </StyledContainer>
  );
});

export default Info;
