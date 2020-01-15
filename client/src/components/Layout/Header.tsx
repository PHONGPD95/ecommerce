import { Badge, Dropdown, Icon, Layout, Menu } from 'antd';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AvatarItem from '~components/UI/AvatarItem';
import { useStores } from '~stores';

const { Divider, Item } = Menu;
const StyledHeader = styled(Layout.Header)`
  padding: 0;
  background: #fff;
  display: flex;
  justify-content: space-between;
`;

const StyledTrigger = styled.div`
  padding: 0 24px;
  cursor: pointer;

  :hover {
    color: #1890ff;
  }
`;

const Header: FC = observer(() => {
  const {
    authStore: { logout },
    userStore: { currentUser },
    layoutStore: { isMobile, isSiderCollapse, toggleSider, toggleShoppingCart },
    shoppingCartStore: { total }
  } = useStores();

  const header = { marginLeft: 0 };

  if (isMobile && !isSiderCollapse) {
    header.marginLeft = 200;
  }

  const menu = (
    <Menu>
      <Item key="1">
        <Link to="/user">
          <Icon type="user" style={{ marginRight: 8 }} />
          {get(currentUser, "fullname", "")}
        </Link>
      </Item>
      <Divider />
      <Item key="2" style={{ color: "red" }} onClick={() => logout()}>
        <Icon type="logout" style={{ marginRight: 8 }} />
        Thoát
      </Item>
    </Menu>
  );

  const admin = (
    <StyledTrigger>
      <Dropdown overlay={menu} placement="bottomRight">
        <AvatarItem />
      </Dropdown>
    </StyledTrigger>
  );

  const user = (
    <StyledTrigger onClick={() => toggleShoppingCart()}>
      <Badge count={total.item} showZero={true} offset={[5, -5]}>
        <Icon type="shopping-cart" style={{ fontSize: 18 }} />
      </Badge>
    </StyledTrigger>
  );

  return (
    <StyledHeader style={{ ...header }}>
      <StyledTrigger onClick={() => toggleSider()}>
        <Icon type="menu" style={{ fontSize: 18 }} />
      </StyledTrigger>
      {currentUser ? admin : user}
    </StyledHeader>
  );
});

export default Header;
