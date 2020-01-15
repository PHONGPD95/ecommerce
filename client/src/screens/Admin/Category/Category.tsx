import { Row } from 'antd';
import { observer } from 'mobx-react';
import React, { FC } from 'react';

import CategoryForm from './Form';
import CategoryGird from './Gird';
import CategoryHeader from './Header';

const Category: FC = observer(() => (
  <Row
    type="flex"
    style={{
      flexFlow: "column",
      height: "calc(100vh - 96px)"
    }}
  >
    <CategoryHeader />
    <CategoryGird />
    <CategoryForm />
  </Row>
));

export default Category;
