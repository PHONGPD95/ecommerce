import { Modal } from 'antd';
import { Formik } from 'formik';
import { Form, FormItem, Input } from 'formik-antd';
import { get, set } from 'lodash';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import * as yup from 'yup';
import { CommonInput } from '~graphql/types';

import store from './store';

const { TextArea } = Input;

interface FormValues {
  value?: string;
  description?: JSON;
}

const validationSchema = yup.object().shape<FormValues>({
  value: yup.string().required("Tên thương hiệu là bắt buộc!"),
  description: yup.string()
});

const BrandForm: FC = observer(() => {
  const { modalVisible, setModalVisible, create, update, selectedItem } = store;

  const initialValues: FormValues = {
    value: get(selectedItem, "value", ""),
    description: get(selectedItem, "meta.description", "")
  };

  const handleSubmit = async (
    { description, ...record }: FormValues,
    { resetForm }
  ) => {
    set(record, "type", "product_brand");
    set(record, "meta.description", description);

    if (selectedItem) {
      await update(get(selectedItem, "_id"), record);
    } else {
      await create(record as CommonInput);
    }

    resetForm();
    setModalVisible();
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid }) => (
        <Modal
          title="Thương hiệu"
          visible={modalVisible}
          cancelText="Đóng"
          cancelButtonProps={{ type: "danger", ghost: true }}
          onCancel={() => setModalVisible()}
          okText={selectedItem ? "Cập nhật" : "Tạo mới"}
          okButtonProps={{
            htmlType: "submit",
            form: "brandForm",
            loading: isSubmitting,
            disabled: !isValid,
            type: "primary"
          }}
        >
          <Form id="brandForm">
            <FormItem name="value" label="Tên thương hiệu">
              <Input name="value" placeholder="Nhập tên thương hiệu" />
            </FormItem>
            <FormItem name="description" label="Mô tả">
              <TextArea name="description" placeholder="Nhập mô tả" rows={6} />
            </FormItem>
          </Form>
        </Modal>
      )}
    </Formik>
  );
});

export default BrandForm;
