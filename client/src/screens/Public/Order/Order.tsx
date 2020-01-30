import { Button, Result, Row, Steps } from 'antd';
import { StepsProps } from 'antd/lib/steps';
import { observer } from 'mobx-react';
import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ShoppingCartList from '~components/ShoppingCart/List';
import { useStores } from '~stores';

import Detail from './Detail';
import Form from './Form';
import store from './store';

const StyledContent = styled.div`
  flex: 1;
  margin: 16px 0;
  background: #ffffff;
  padding: 16px 24px;
  overflow: scroll;
`;

const { Step } = Steps;

const steps = [
  {
    title: "Giỏ hàng",
    content: <ShoppingCartList />
  },
  {
    title: "Thông tin cá nhân",
    content: <Form />
  },
  {
    title: "Xác nhận đơn hàng",
    content: <Detail />
  },
  {
    title: "Kết thúc",
    content: (
      <Result
        status="success"
        title="Tạo đơn hàng thành công!"
        subTitle="Đơn hàng đang chờ xác nhận từ nhân viên."
        extra={[
          <Link key="shopping" to="/">
            Tiếp tục mua hàng
          </Link>
        ]}
      />
    )
  }
];

const Order: FC = observer(() => {
  const {
    shoppingCartStore: { cart }
  } = useStores();
  const { setCurrentStep, currentStep, status, handleSubmit } = store;

  useEffect(() => {
    setCurrentStep(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <Row
      type="flex"
      style={{
        flexFlow: "column",
        height: "calc(100vh - 64px)",
        padding: 16
      }}
    >
      <Steps current={currentStep} status={status as StepsProps["status"]}>
        {steps.map((item, index) => (
          <Step key={index} title={item.title} />
        ))}
      </Steps>
      <StyledContent>{steps[currentStep].content}</StyledContent>
      <Row type="flex" justify="end">
        {currentStep > 0 && currentStep < steps.length - 1 && (
          <Button onClick={prev}>Quay lại</Button>
        )}
        {currentStep < steps.length - 2 && (
          <Button
            form="orderForm"
            htmlType="submit"
            style={{ marginLeft: 8 }}
            type="primary"
            onClick={currentStep !== 1 ? next : undefined}
            disabled={cart.length === 0}
          >
            Tiếp tục
          </Button>
        )}
        {currentStep === steps.length - 2 && (
          <Button
            type="primary"
            style={{ marginLeft: 8 }}
            onClick={handleSubmit}
          >
            Xác nhận
          </Button>
        )}
      </Row>
    </Row>
  );
});

export default Order;
