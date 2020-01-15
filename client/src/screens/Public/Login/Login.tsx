import { Button } from 'antd';
import { Formik } from 'formik';
import { Form, FormItem, Input } from 'formik-antd';
import { observer } from 'mobx-react';
import React, { FC, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import styled from 'styled-components';
import * as yup from 'yup';
import { useStores } from '~stores';

const { Password } = Input;

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  height: 100vh;
  background: #00152a;
`;

const LoginForm = styled.div`
  margin-top: 10%;
  width: 350px;
  padding: 25px;
  border-radius: 15px;
  background: #fff;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.5);
`;

interface FormValues {
  username: string;
  password: string;
}

const validationSchema = yup.object().shape<FormValues>({
  username: yup.string().required("Tên đăng nhập là bắt buộc!"),
  password: yup.string().required("Mật khẩu là bắt buộc!")
});

const Login: FC = observer(() => {
  const {
    authStore: { login },
    userStore: { currentUser }
  } = useStores();

  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/admin" } };

  const initialValues: FormValues = {
    username: "",
    password: ""
  };

  useEffect(() => {
    if (currentUser) {
      history.replace(from);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleSubmit = async (
    { username, password }: FormValues,
    { resetForm }
  ) => {
    await login(username, password);

    resetForm();
  };

  return (
    <Container>
      <LoginForm>
        <h1 style={{ textAlign: "center" }}>Đăng nhập</h1>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form id="loginForm">
              <FormItem name="username" label="Tên đăng nhập">
                <Input name="username" placeholder="Nhập tên đăng nhập" />
              </FormItem>
              <FormItem name="password" label="Mật khẩu">
                <Password name="password" placeholder="Nhập mật khẩu" />
              </FormItem>
              <Button
                type="primary"
                block={true}
                icon="login"
                htmlType="submit"
                loading={isSubmitting}
              >
                Đăng nhập
              </Button>
            </Form>
          )}
        </Formik>
      </LoginForm>
    </Container>
  );
});

export default Login;
