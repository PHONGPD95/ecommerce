import { Comment, Tooltip } from 'antd';
import { observer } from 'mobx-react';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import ReactResizeDetector from 'react-resize-detector';
import styled from 'styled-components';

import { AvatarItem, Loading } from '~components/UI';
import { Message } from '~graphql/types';
import { useStores } from '~stores';

import store from './store';

const StyledCommentContainer = styled.div<{ isMine: boolean }>`
  display: flex;
  justify-content: ${({ isMine }) => (isMine ? "flex-end" : "flex-start")};
`;

const StyledMessage = styled.div<{ isMine: boolean }>`
  border-radius: 15px;
  padding: 5px 10px;
  background: ${({ isMine }) => (isMine ? "#f0f0f0" : "#e6f7ff")};
`;

const ChatList: FC = observer(() => {
  const {
    userStore: { currentUser }
  } = useStores();
  const { hasMore, messages, loadMessages } = store;

  const [scrollParentRef, setScrollParentRef] = useState();

  useEffect(() => {
    const ele = document.getElementById("chatList");
    ele!.scrollTop = ele!.scrollHeight;
  }, [messages]);

  const renderProduct = messages.map((item: Message, index) => {
    const isMine = item.creatorId === currentUser._id;

    const avatar = !isMine && <AvatarItem fullname={item.creator!.fullname} />;
    const content = (
      <Tooltip title={moment(item.createdAt).format("YYYY-MM-DD HH:mm")}>
        <StyledMessage isMine={isMine}>{item.content}</StyledMessage>
      </Tooltip>
    );

    return (
      <StyledCommentContainer key={index} isMine={isMine}>
        <Comment avatar={avatar} content={content} />
      </StyledCommentContainer>
    );
  });

  return (
    <ReactResizeDetector handleHeight>
      {({ height }) => (
        <div
          id="chatList"
          style={{
            height,
            overflow: "auto",
            padding: "1rem"
          }}
          ref={ref => setScrollParentRef(ref)}
        >
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMessages}
            hasMore={hasMore}
            loader={<Loading key="loading" />}
            isReverse={true}
            useWindow={false}
            getScrollParent={() => scrollParentRef}
          >
            {renderProduct}
          </InfiniteScroll>
        </div>
      )}
    </ReactResizeDetector>
  );
});

export default ChatList;
