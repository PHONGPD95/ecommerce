import { Button, message, Row, Steps } from 'antd';
import { observer } from 'mobx-react';
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import ShoppingCartList from '~components/ShoppingCart/List';
import { useStores } from '~stores';

import Form from './Form';

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
    content: "Last-content"
  }
];

const Order: FC = observer(() => {
  const {
    shoppingCartStore: { cart }
  } = useStores();

  const [currentStep, setCurrentStep] = useState(0);

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
      <Steps current={currentStep}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <StyledContent>{steps[currentStep].content}</StyledContent>
      <Row type="flex" justify="end">
        {currentStep > 0 && <Button onClick={prev}>Quay lại</Button>}
        {currentStep < steps.length - 1 && (
          <Button
            style={{ marginLeft: 8 }}
            type="primary"
            onClick={next}
            disabled={cart.length === 0}
          >
            Tiếp tục
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button
            type="primary"
            style={{ marginLeft: 8 }}
            onClick={() => message.success("Processing complete!")}
          >
            Hoàn thành
          </Button>
        )}
      </Row>
    </Row>
  );
});

export default Order;
