import { Layout } from 'antd';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import styled from 'styled-components';
import { useStores } from '~stores';

import Menu from './Navigation';

const StyledSider = styled(Layout.Sider)`
  height: 100vh;
  overflow: auto;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
`;

const StyledLogo = styled.div`
  /* width: 120px; */
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  /* margin: 16px; */
  /* float: left; */
`;

const Sider: FC = observer(() => {
  const {
    layoutStore: { isMobile, setMobile, isSiderCollapse, toggleSider }
  } = useStores();

  return (
    <StyledSider
      collapsible
      trigger={null}
      collapsedWidth={isMobile ? 0 : 80}
      breakpoint="md"
      onBreakpoint={() => {
        setMobile(window.innerWidth < 768 ? true : false);
      }}
      onCollapse={collapse => {
        toggleSider(collapse);
      }}
      collapsed={isSiderCollapse}
    >
      {!isMobile && <StyledLogo />}
      <Menu />
    </StyledSider>
  );
});

export default Sider;
