import { Button, Icon } from 'antd';
import { get, truncate } from 'lodash';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Product } from '~graphql/types';
import { useStores } from '~stores';
import { CURRENCY_FORMAT, formatNumber } from '~utils/formatNumber';

const StyledImgBox = styled.div`
  width: 100%;
  overflow: hidden;

  img {
    transition: transform 0.5s ease;
  }

  :hover img {
    transform: scale(1.2);
  }
`;

const StyledContainer = styled.li`
  text-align: center;
  list-style-type: none;
  background: #f3f4f6;

  :hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }

  .item-content {
    padding: 10px;
  }

  .item-name {
    color: black;
    font-size: 20px;

    a {
      color: #000;
    }
  }

  .item-brand {
    font-size: 16px;

    a {
      color: #b9beca;
    }
  }

  .item-price {
    color: #5b5a5e;
    font-size: 18px;
  }
`;

interface Props {
  item: Product;
}

const Item: FC<Props> = observer(({ item }) => {
  const {
    shoppingCartStore: { addItem }
  } = useStores();

  const product = { ...item, images: item.images.slice() };

  return (
    <StyledContainer>
      <StyledImgBox>
        <img
          alt={get(product, "name", "")}
          src={get(
            product,
            "images[0].path",
            require("../../assets/images/404.png")
          )}
          width="100%"
        />
      </StyledImgBox>
      <div className="item-content">
        <div className="item-name">
          <Link to={`/detail?sku=${product.sku}`}>
            {truncate(get(product, "display", ""), { length: 12 })}
          </Link>
        </div>
        <div className="item-brand">
          <Link to={`/product?brandId=${product.brandId}`}>
            {get(product, "brand.value", "")}
          </Link>
        </div>
        <div className="item-price">
          {formatNumber(get(product, "price", 0), CURRENCY_FORMAT)}
        </div>
      </div>
      <Button
        type="primary"
        onClick={() => addItem(product, 1)}
        block={true}
        size="large"
        style={{ borderRadius: 0 }}
      >
        <Icon type="shopping-cart" />
      </Button>
    </StyledContainer>
  );
});

export default Item;
