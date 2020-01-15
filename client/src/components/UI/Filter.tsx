import { Button, Drawer } from 'antd';
import { Formik, FormikValues } from 'formik';
import { Form, FormItem, SubmitButton } from 'formik-antd';
import queryString from 'query-string';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const StyledFooter = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e9e9e9;
  padding: 10px 16px;
  background: #fff;
  text-align: right;
`;

interface FilterConfig {
  name: string;
  label: string;
  component: React.ComponentType<any>;
  componentProps?: any;
}

interface Props {
  filteConfig: FilterConfig[];
  onFilter: (filter: FormikValues) => void;
}

const Filter: FC<Props> = ({ filteConfig, onFilter }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [initFilter, setInitFilter] = useState({});

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const query = queryString.parse(location.search);
    setInitFilter(query);
    onFilter(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const renderFilter = filteConfig.map(
    ({ name, label, component: Component, componentProps }, index) => (
      <FormItem key={index} name={name} label={label}>
        <Component name={name} {...componentProps} />
      </FormItem>
    )
  );

  const clearFilter = (values, resetForm) => {
    const where = Object.keys(values).reduce((all, item) => {
      all[item] = undefined;
      return all;
    }, {});

    history.push({ search: undefined });
    setInitFilter({});
    resetForm({});

    onFilter(where);
    toggleDrawer();
  };

  const submitFilter = (values, actions) => {
    actions.setSubmitting(false);

    const stringified = queryString.stringify(values);
    history.push({ search: stringified });

    onFilter(values);
    toggleDrawer();
  };

  return (
    <Fragment>
      <Button type="primary" icon="filter" ghost onClick={toggleDrawer} />
      <Formik
        enableReinitialize
        initialValues={initFilter}
        onSubmit={submitFilter}
      >
        {({ values, resetForm }) => (
          <Drawer
            title="Filter"
            placement="right"
            closable={false}
            onClose={toggleDrawer}
            visible={drawerVisible}
          >
            <Form>
              {renderFilter}
              <StyledFooter>
                <Button
                  onClick={() => clearFilter(values, resetForm)}
                  style={{ marginRight: 8 }}
                  type="danger"
                  ghost
                >
                  Bỏ chọn
                </Button>
                <SubmitButton type="primary">Áp dụng</SubmitButton>
              </StyledFooter>
            </Form>
          </Drawer>
        )}
      </Formik>
    </Fragment>
  );
};

export default Filter;
