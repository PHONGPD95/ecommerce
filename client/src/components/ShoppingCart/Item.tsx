import { Icon, List } from 'antd';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import styled from 'styled-components';
import { useStores } from '~stores';
import { ProductCart } from '~stores/shoppingCartStore';
import { CURRENCY_FORMAT, formatNumber } from '~utils/formatNumber';

const { Item } = List;
const { Meta } = Item;

const StyledImage = styled.img`
  width: 100px;
`;

const StyledContent = styled(Meta)`
  padding: 10px;
  width: 100%;
`;

const StyledPrice = styled.div`
  color: #5b5a5e;
  font-size: 18px;
`;

interface Props {
  data: ProductCart;
}

const ShoppingCartItem: FC<Props> = observer(({ data }) => {
  const {
    shoppingCartStore: { addItem, removeItem }
  } = useStores();

  const item = { ...data, images: data.images.slice() };

  return (
    <Item
      actions={[
        <Icon type="plus" key="plus" onClick={() => addItem(item)} />,
        <Icon type="minus" key="minus" onClick={() => addItem(item, -1)} />,
        <Icon type="close" key="close" onClick={() => removeItem(item)} />
      ]}
    >
      <StyledImage
        alt={get(item, "display")}
        src={get(
          item,
          "images[0].path",
          require("../../assets/images/404.png")
        )}
      />
      <StyledContent
        title={<a href="https://ant.design">{get(item, "display", "")}</a>}
        description={<div>SL: {get(item, "amount", 0)}</div>}
      />
      <StyledPrice>
        {formatNumber(get(item, "price", 0), CURRENCY_FORMAT)}
      </StyledPrice>
    </Item>
  );
});

export default ShoppingCartItem;
