import { Col, Row } from 'antd';
import { observer } from 'mobx-react';
import React, { FC, Fragment, useEffect } from 'react';
import List from '~components/List/List';
import useQueryParams from '~utils/useQueryParams';

import Info from './Info';
import Preview from './Preview';
import store from './store';

const Detail: FC = observer(() => {
  const { init, filter, product } = store;

  let query = useQueryParams();
  const sku = query.get("sku");

  useEffect(() => {
    if (sku) {
      init(sku);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sku]);

  return (
    <Fragment>
      <Row type="flex">
        <Col xs={24} md={16}>
          <Preview />
        </Col>
        <Col xs={24} md={8}>
          <Info />
        </Col>
      </Row>
      {product && <List title="Sản phẩm liên quan" filter={filter} />}
    </Fragment>
  );
});

export default Detail;
