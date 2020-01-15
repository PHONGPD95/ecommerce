import { Avatar } from 'antd';
import { AvatarProps } from 'antd/lib/avatar';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { useStores } from '~stores';

interface Props extends AvatarProps {
  fullname?: string;
}

const AvatarItem: FC<Props> = observer(({ fullname, ...props }) => {
  const {
    userStore: { currentUser }
  } = useStores();

  let char = "";

  const arrChar = fullname
    ? fullname.split(" ")
    : get(currentUser, "fullname", "").split(" ");

  if (arrChar.length > 1) {
    const firstChar = arrChar.shift()[0] as string;
    const lastChar = arrChar.pop()[0] as string;

    char = firstChar.toUpperCase() + lastChar.toUpperCase();
  } else {
    char = arrChar[0][0];
  }
  return <Avatar {...props}>{char}</Avatar>;
});

export default AvatarItem;
