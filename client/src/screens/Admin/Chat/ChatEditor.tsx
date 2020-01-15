import { Button, Col, Form, Input, Row } from 'antd';
import { observer } from 'mobx-react';
import React, { FC, useState } from 'react';

import store from './store';

const ChatEditor: FC = observer(() => {
  const { create, loading } = store;
  const [content, setContent] = useState("");

  const handleChange = e => {
    setContent(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    await create({ content }).finally(() => setContent(""));
  };

  return (
    <Form
      layout="inline"
      id="chatForm"
      style={{ margin: "1rem" }}
      onSubmit={handleSubmit}
    >
      <Row gutter={8}>
        <Col xs={24} md={20}>
          <Input
            style={{ width: "100%" }}
            onChange={handleChange}
            value={content}
            placeholder="Nhập văn bản"
          />
        </Col>
        <Col xs={24} md={4}>
          <Button
            htmlType="submit"
            form="chatForm"
            loading={loading}
            disabled={!content}
            type="primary"
            block
          >
            Gửi
          </Button>
        </Col>
      </Row>
    </Form>
  );
});

export default ChatEditor;
