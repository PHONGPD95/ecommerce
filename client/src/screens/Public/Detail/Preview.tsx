import { Carousel } from 'antd';
import { get, isEmpty } from 'lodash';
import { observer } from 'mobx-react';
import React, { FC } from 'react';

import store from './store';

const Preview: FC = observer(() => {
  const { product } = store;

  if (!product) return null;

  return (
    <Carousel effect="fade" autoplay>
      {isEmpty(product.images) ? (
        <img
          alt="empty"
          src={require("../../../assets/images/404.png")}
          style={{ width: "100%" }}
        />
      ) : (
        product.images.map(item => (
          <img
            key={item.id}
            alt={item.id}
            src={get(item, "path", require("../../../assets/images/404.png"))}
            style={{ width: "100%" }}
          />
        ))
      )}
    </Carousel>
  );
});

export default Preview;
