import { Button } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import TableServer from '~components/Table/TableServer';
import { COUNT_COMMON, FIND_MANY_COMMON } from '~graphql/queries';
import { Common } from '~graphql/types';
import { formatTime } from '~utils/formatTime';

import CellActionRenderer from './CellActionRenderer';
import store from './store';

interface IColumnProps<T> extends ColumnProps<T> {
  filter?: boolean;
}

export const columns: IColumnProps<Common>[] = [
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
    title: "Thương hiệu",
    dataIndex: "value",
    width: 150,
    filter: true,
    sorter: true
  },
  {
    title: "Mô tả",
    dataIndex: "meta.description",
    width: 300
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

const BrandGird: FC = observer(() => {
  const { filter } = store;

  return (
    <ReactResizeDetector handleHeight>
      {({ height }) => (
        <TableServer
          scroll={{ x: 375, y: height - 171 }}
          columns={columns}
          FIND_QUERY={FIND_MANY_COMMON}
          findKey="findManyCommon"
          COUNT_QUERY={COUNT_COMMON}
          countKey="countCommon"
          filterOptions={filter}
          size="small"
        />
      )}
    </ReactResizeDetector>
  );
});

export default BrandGird;
