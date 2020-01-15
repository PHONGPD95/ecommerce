import { Row } from 'antd';
import { observer } from 'mobx-react';
import React, { FC } from 'react';

import ProductForm from './Form';
import ProductGird from './Gird';
import ProductHeader from './Header';

const Product: FC = observer(() => {
  return (
    <Row
      type="flex"
      style={{
        flexFlow: "column",
        height: "calc(100vh - 96px)"
      }}
    >
      <ProductHeader />
      <ProductGird />
      <ProductForm />
    </Row>
  );
});

export default Product;
