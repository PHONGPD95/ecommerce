import { Row } from 'antd';
import { observer } from 'mobx-react';
import React, { FC } from 'react';

import BrandForm from './Form';
import BrandGird from './Gird';
import BrandHeader from './Header';

const Brand: FC = observer(() => (
  <Row
    type="flex"
    style={{
      flexFlow: "column",
      height: "calc(100vh - 96px)"
    }}
  >
    <BrandHeader />
    <BrandGird />
    <BrandForm />
  </Row>
));

export default Brand;
