import React, { FC, useEffect, useState } from 'react';
import List from '~components/List/List';
import { ProductFilter, ProductSort } from '~graphql/types';
import useQueryParams from '~utils/useQueryParams';

const Product: FC = () => {
  const [where, setWhere] = useState<ProductFilter>({});

  let query = useQueryParams();
  const brandId = query.get("brandId");
  const categoryId = query.get("categoryId");

  const value = brandId || categoryId;
  const text = value ? value.toUpperCase() : "";

  useEffect(() => {
    let params = { brandId, categoryId } as ProductFilter;
    params = Object.keys(params).reduce((all, item) => {
      if (params[item]) {
        all[item] = params[item];
      }
      return all;
    }, {});

    setWhere(params);
  }, [brandId, categoryId]);

  const sort = { createdAt: "DESC" } as ProductSort;
  const filter = { where, sort };

  return <List title={`Tất cả sản phẩm ${text}`} filter={filter} />;
};

export default Product;
