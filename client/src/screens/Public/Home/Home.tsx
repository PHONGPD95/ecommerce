import React, { FC, Fragment } from 'react';
import List from '~components/List/List';
import SlideBanner from '~components/SlideBanner/SlideBanner';
import { ProductSort } from '~graphql/types';

const Home: FC = () => {
  const width = window.innerWidth;

  let limit = 6;
  if (1200 < width && width < 1600) {
    limit = 8;
  } else if (1600 < width) {
    limit = 10;
  }
  const sort = { createdAt: "DESC" } as ProductSort;
  const filter = { limit, sort };

  return (
    <Fragment>
      <SlideBanner />
      <List title="Sản phẩm mới" filter={filter} />
    </Fragment>
  );
};

export default Home;
