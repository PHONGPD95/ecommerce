import { Button } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import ReactResizeDetector from 'react-resize-detector';

import TableServer from '~components/Table/TableServer';
import { Loading } from '~components/UI';
import { COUNT_PRODUCT, FIND_MANY_PRODUCT } from '~graphql/queries';
import { Product } from '~graphql/types';
import { CURRENCY_FORMAT, formatNumber } from '~utils/formatNumber';
import { formatTime } from '~utils/formatTime';

import CellActionRenderer from './CellActionRenderer';
import store from './store';

interface IColumnProps<T> extends ColumnProps<T> {
  filter?: boolean;
}

export const columns: IColumnProps<Product>[] = [
  {
    title: (
      <Button
        type="link"
        icon="reload"
        size="small"
        onClick={() => store.refresh()}
      />
    ),
    dataIndex: "_id",
    width: 80,
    ellipsis: true,
    align: "center",
    render: (text, record) => <CellActionRenderer text={text} record={record} />
  },
  {
    title: "SKU",
    dataIndex: "sku",
    width: 80,
    filter: true
  },
  {
    title: "Sản phẩm",
    dataIndex: "display",
    width: 200,
    filter: true,
    sorter: true
  },
  {
    title: "Thương hiệu",
    dataIndex: "brandId",
    width: 150,
    filter: true,
    sorter: true,
    render: (_text, record) => get(record, "brand.value", "")
  },
  {
    title: "Nhóm sản phẩm",
    dataIndex: "categoryId",
    width: 150,
    filter: true,
    sorter: true,
    render: (_text, record) => get(record, "category.value", "")
  },
  {
    title: "Giá nhập",
    dataIndex: "cost",
    width: 100,
    sorter: true,
    align: "right",
    render: text => formatNumber(text, CURRENCY_FORMAT)
  },
  {
    title: "Giá bán",
    dataIndex: "price",
    width: 100,
    sorter: true,
    align: "right",
    render: text => formatNumber(text, CURRENCY_FORMAT)
  },
  {
    title: "SL",
    dataIndex: "quantity",
    width: 60,
    sorter: true,
    align: "right",
    render: text => formatNumber(text)
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    width: 150,
    sorter: true,
    defaultSortOrder: "descend",
    render: text => formatTime(text)
  }
];

const ProductGird: FC = observer(() => {
  const { filter, initFilter } = store;

  if (!initFilter) return <Loading />;

  return (
    <ReactResizeDetector handleHeight>
      {({ height }) => (
        <TableServer
          scroll={{ x: 375, y: height - 171 }}
          columns={columns}
          FIND_QUERY={FIND_MANY_PRODUCT}
          findKey="findManyProduct"
          COUNT_QUERY={COUNT_PRODUCT}
          countKey="countProduct"
          filterOptions={filter}
          size="small"
        />
      )}
    </ReactResizeDetector>
  );
});

export default ProductGird;
