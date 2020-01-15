import { Table } from 'antd';
import { PaginationConfig, TableProps } from 'antd/lib/table';
import { DocumentNode } from 'graphql';
import { get, isEmpty, isEqual, isNumber } from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import client from '~graphql/client';
import usePrevious from '~utils/usePrevious';

const sortable = {
  ascend: "ASC",
  descend: "DESC"
};

interface Props extends TableProps<any> {
  FIND_QUERY: DocumentNode;
  findKey: string;
  COUNT_QUERY: DocumentNode;
  countKey: string;
  filterOptions?: any;
}

const TableServer: FC<Props> = ({
  FIND_QUERY,
  findKey,
  COUNT_QUERY,
  countKey,
  filterOptions,
  ...props
}) => {
  const [paginationOption, setPaginationOption] = useState<PaginationConfig>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);

  const prevFilter = usePrevious(filterOptions);

  useEffect(() => {
    const filter = Object.keys(filterOptions).reduce((all, item) => {
      if (isNumber(filterOptions[item]) || !isEmpty(filterOptions[item])) {
        all[item] = filterOptions[item];
      }
      return all;
    }, {});

    if (filter && get(filter, "limit")) {
      setPaginationOption({ pageSize: get(filter, "limit"), current: 1 });
    }

    if (!isEqual(filter, prevFilter)) {
      fetchData(filter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOptions]);

  const fetchData = async (filter: any = {}) => {
    setLoading(true);

    const { data } = await client.query({
      query: COUNT_QUERY,
      variables: { where: get(filter, "where", {}) },
      fetchPolicy: "network-only"
    });

    const total = data[countKey] | 0;
    setPaginationOption({
      ...paginationOption,
      total,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`
    });

    if (total > 0) {
      const { data } = await client.query({
        query: FIND_QUERY,
        variables: { ...filter },
        fetchPolicy: "network-only"
      });

      setData(data[findKey]);
    } else {
      setData([]);
    }

    setLoading(false);
  };

  const onChange = async (pagination, _filters, sorter) => {
    const { current, pageSize } = pagination;
    const { field, order } = sorter;

    setPaginationOption({ ...paginationOption, current });

    const limit = pageSize;
    const skip = limit * (current - 1);

    let sort = {};
    if (field) {
      sort = { [field]: sortable[order] };
    }

    const filter = { ...filterOptions, limit, skip, sort };
    await fetchData(filter);
  };

  return (
    <Table
      style={{ background: "#fff" }}
      rowKey="_id"
      dataSource={data}
      pagination={paginationOption}
      loading={loading}
      onChange={onChange}
      {...props}
    />
  );
};

export default TableServer;
