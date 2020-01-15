import { Icon, Menu } from 'antd';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from '~screens/Routes';
import { useStores } from '~stores';

const { Item, SubMenu } = Menu;

const StyledMenu = styled(Menu)`
  line-height: 64;
`;

const Navigation: FC<RouteComponentProps> = observer(() => {
  const {
    userStore: { currentUser },
    layoutStore: { isMobile }
  } = useStores();

  return (
    <StyledMenu theme="dark" mode={isMobile ? "vertical" : "inline"}>
      {routes
        .filter(route => !route.hide)
        .filter(
          route => !!currentUser === !!route.isPrivate && route.path !== "/user"
        )
        .map(route =>
          route.subRoutes ? (
            <SubMenu
              key={route.name}
              title={
                <span>
                  {route.icon && <Icon type={route.icon} />}
                  <span>{route.name}</span>
                </span>
              }
            >
              {route.subRoutes.map(subRoute => (
                <Item key={subRoute.name}>
                  <Link to={route.path + subRoute.path}>
                    <span>{subRoute.name}</span>
                  </Link>
                </Item>
              ))}
            </SubMenu>
          ) : (
            <Item key={route.name}>
              <Link to={route.path}>
                {route.icon && <Icon type={route.icon} />}
                <span>{route.name}</span>
              </Link>
            </Item>
          )
        )}
    </StyledMenu>
  );
});

export default withRouter(Navigation);
