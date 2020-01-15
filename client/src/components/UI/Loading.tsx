import { Spin } from 'antd';
import React, { FC } from 'react';
import styled from 'styled-components';

const SpinWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const Loading: FC = props => {
  return (
    <SpinWrapper>
      <Spin tip="Đang tải..." {...props} />
    </SpinWrapper>
  );
};

export default Loading;
