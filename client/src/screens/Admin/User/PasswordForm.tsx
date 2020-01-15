import { Formik } from 'formik';
import { Form, FormItem, Input, SubmitButton } from 'formik-antd';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import { useStores } from '~stores';

const StyledContainer = styled.div`
  padding: 24px 40px;
`;

export interface FormValues {
  username: string;
  oldPassword: string;
  newPassword: string;
}

const validationSchema = yup.object().shape<FormValues>({
  username: yup.string().required("Tên đăng nhập là bắt buộc!"),
  oldPassword: yup.string().required("Mật khẩu hiện tại là bắt buộc!"),
  newPassword: yup.string().required("Mật khẩu mới là bắt buộc!")
});

const PasswordForm: FC = observer(() => {
  const {
    userStore: { currentUser, changePassword }
  } = useStores();

  const initialValues: FormValues = {
    username: get(currentUser, "username", ""),
    oldPassword: "",
    newPassword: ""
  };

  const handleSubmit = async (
    { oldPassword, newPassword }: FormValues,
    { resetForm }
  ) => {
    await changePassword(oldPassword, newPassword);
    resetForm();
  };

  return (
    <StyledContainer>
      <h1>Thông tin tài khoản</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form id="passwordForm">
            <FormItem name="username" label="Tên đăng nhập">
              <Input
                name="username"
                placeholder="Nhập tên đăng nhập"
                disabled
              />
            </FormItem>
            <FormItem name="oldPassword" label="Mật khẩu hiện tại">
              <Input.Password
                name="oldPassword"
                placeholder="Nhập mật khẩu hiện tại"
              />
            </FormItem>
            <FormItem name="newPassword" label="Mật khẩu mới">
              <Input.Password
                name="newPassword"
                placeholder="Nhập mật khẩu mới"
              />
            </FormItem>
            <SubmitButton
              type="primary"
              disabled={!isValid}
              loading={isSubmitting}
            >
              Cập nhật thông tin
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </StyledContainer>
  );
});

export default PasswordForm;
