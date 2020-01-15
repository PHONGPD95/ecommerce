import { Select, SelectProps } from 'formik-antd';
import { FIND_MANY_COMMON } from 'graphql/queries';
import { FindManyCommon, FindManyCommonVariables } from 'graphql/types';
import React, { FC } from 'react';
import { useQuery } from 'react-apollo';

interface Props extends SelectProps {
  name: string;
  type?: string;
}

const SelectCommon: FC<Props> = ({ name, type, ...props }) => {
  const { loading, error, data } = useQuery<
    FindManyCommon,
    FindManyCommonVariables
  >(FIND_MANY_COMMON, {
    variables: { where: { type } }
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Select name={name} loading={loading} {...props} style={{ width: "100%" }}>
      {data &&
        data.findManyCommon.map(item => (
          <Select.Option key={item.key as string} value={item.key as string}>
            {item.value}
          </Select.Option>
        ))}
    </Select>
  );
};

export default SelectCommon;
