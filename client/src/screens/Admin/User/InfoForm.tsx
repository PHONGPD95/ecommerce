import { Col, Row } from 'antd';
import { Formik } from 'formik';
import { DatePicker, Form, FormItem, Input, SubmitButton } from 'formik-antd';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import AvatarItem from '~components/UI/AvatarItem';
import { UpdateInfoInput } from '~graphql/types';
import { useStores } from '~stores';

const StyledContainer = styled.div`
  padding: 24px 40px;
`;

const StyledAvatar = styled.div`
  width: 100%;
  height: 100px;
  text-align: center;
`;

export interface FormValues {
  fullname?: string;
  address?: string;
  phone?: string;
  dob?: Date;
}

const validationSchema = yup.object().shape<FormValues>({
  fullname: yup.string().required("Tên đầy đủ là bắt buộc!"),
  address: yup.string().nullable(),
  phone: yup.string().nullable(),
  dob: yup.date().nullable()
});

const InfoForm: FC = observer(() => {
  const {
    userStore: { currentUser, update }
  } = useStores();

  const initialValues: FormValues = {
    fullname: get(currentUser, "fullname", ""),
    address: get(currentUser, "address", ""),
    phone: get(currentUser, "phone", ""),
    dob: get(currentUser, "dob")
  };

  const handleSubmit = async (record: FormValues) => {
    await update(record as UpdateInfoInput);
  };

  return (
    <StyledContainer>
      <h1>Thông tin cá nhân</h1>
      <StyledAvatar>
        <AvatarItem size={100} />
      </StyledAvatar>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form id="infoForm">
            <FormItem name="fullname" label="Tên đầy đủ">
              <Input name="fullname" placeholder="Nhập tên đầy đủ" />
            </FormItem>
            <FormItem name="address" label="Địa chỉ">
              <Input.TextArea
                name="address"
                placeholder="Nhập địa chỉ"
                rows={3}
              />
            </FormItem>
            <Row gutter={8}>
              <Col md={12}>
                <FormItem name="phone" label="Số điện thoại">
                  <Input
                    addonBefore="+84"
                    name="phone"
                    placeholder="Nhập số điện thoại"
                  />
                </FormItem>
              </Col>
              <Col md={12}>
                <FormItem name="dob" label="Ngày sinh">
                  <DatePicker
                    name="dob"
                    placeholder="Nhập ngày sinh"
                    style={{ width: "100%" }}
                  />
                </FormItem>
              </Col>
            </Row>
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

export default InfoForm;
