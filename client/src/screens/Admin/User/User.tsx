import { Tabs } from 'antd';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import styled from 'styled-components';

import { useStores } from '~stores';

import InfoForm from './InfoForm';
import PasswordForm from './PasswordForm';

const StyledContainer = styled.div`
  padding: 24px;
`;

const { TabPane } = Tabs;

const User: FC = observer(() => {
  const {
    layoutStore: { isMobile }
  } = useStores();

  return (
    <StyledContainer>
      <Tabs tabPosition={isMobile ? "top" : "left"}>
        <TabPane tab="Thông tin cơ bản" key="1">
          <InfoForm />
        </TabPane>
        <TabPane tab="Thông tin bảo mật" key="2">
          <PasswordForm />
        </TabPane>
      </Tabs>
    </StyledContainer>
  );
});

export default User;
