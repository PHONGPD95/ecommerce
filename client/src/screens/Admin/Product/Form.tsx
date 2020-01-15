import { Col, Modal, Row } from 'antd';
import { Formik } from 'formik';
import { Form, FormItem, Input, InputNumber } from 'formik-antd';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import * as yup from 'yup';
import { SelectCommon, UploadForm } from '~components/UI';
import { ProductInput } from '~graphql/types';

import store from './store';

export interface FormValues {
  sku?: string;
  display?: string;
  categoryId?: string;
  brandId?: string;
  cost?: number;
  price?: number;
  quantity?: number;
}

const validationSchema = yup.object().shape<FormValues>({
  sku: yup.string().required("SKU là bắt buộc!"),
  display: yup.string().required("Tên hiển thị là bắt buộc!"),
  categoryId: yup.string().required("Nhóm sản phẩm là bắt buộc!"),
  brandId: yup.string().required("Thương hiệu là bắt buộc!"),
  cost: yup.number().required("Giá nhập là bắt buộc!"),
  price: yup.number().required("Giá bán là bắt buộc!"),
  quantity: yup.number().required("Số lượng là bắt buộc!")
});

const ProductForm: FC = observer(() => {
  const {
    modalVisible,
    setModalVisible,
    create,
    update,
    selectedItem,
    fileList,
    setFileList
  } = store;

  const initialValues: FormValues = {
    sku: get(selectedItem, "sku", ""),
    display: get(selectedItem, "display", ""),
    categoryId: get(selectedItem, "categoryId"),
    brandId: get(selectedItem, "brandId"),
    cost: get(selectedItem, "cost", 1),
    price: get(selectedItem, "price", 1),
    quantity: get(selectedItem, "quantity", 1)
  };

  const handleSubmit = async (record: FormValues) => {
    if (selectedItem) {
      await update(get(selectedItem, "_id"), record);
      setModalVisible();
    } else {
      await create(record as ProductInput);
    }
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
          title="Sản phẩm"
          visible={modalVisible}
          cancelText="Đóng"
          cancelButtonProps={{ type: "danger", ghost: true }}
          onCancel={() => setModalVisible()}
          okText={selectedItem ? "Cập nhật" : "Tạo mới"}
          okButtonProps={{
            htmlType: "submit",
            form: "productForm",
            loading: isSubmitting,
            disabled: !isValid,
            type: "primary"
          }}
        >
          <Form id="productForm">
            <Row gutter={8}>
              <Col xs={{ span: 12 }}>
                <FormItem name="sku" label="SKU">
                  <Input name="sku" placeholder="Nhập SKU" />
                </FormItem>
              </Col>
              <Col xs={{ span: 12 }}>
                <FormItem name="display" label="Tên sản phẩm">
                  <Input name="display" placeholder="Nhập tên sản phẩm" />
                </FormItem>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col xs={{ span: 12 }}>
                <FormItem name="brandId" label="Thương hiệu">
                  <SelectCommon
                    name="brandId"
                    type="product_brand"
                    placeholder="Chọn thương hiệu"
                  />
                </FormItem>
              </Col>
              <Col xs={{ span: 12 }}>
                <FormItem name="categoryId" label="Nhóm sản phẩm">
                  <SelectCommon
                    name="categoryId"
                    type="product_category"
                    placeholder="Chọn nhóm sản phẩm"
                  />
                </FormItem>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col xs={{ span: 8 }}>
                <FormItem name="cost" label="Giá nhập">
                  <InputNumber
                    name="cost"
                    placeholder="Nhập giá nhập"
                    style={{ width: "100%" }}
                  />
                </FormItem>
              </Col>
              <Col xs={{ span: 8 }}>
                <FormItem name="price" label="Giá bán">
                  <InputNumber
                    name="price"
                    placeholder="Nhập giá bán"
                    style={{ width: "100%" }}
                  />
                </FormItem>
              </Col>
              <Col xs={{ span: 8 }}>
                <FormItem name="quantity" label="Số lượng">
                  <InputNumber
                    name="quantity"
                    placeholder="Nhập số lượng"
                    style={{ width: "100%" }}
                  />
                </FormItem>
              </Col>
            </Row>
            {selectedItem && (
              <UploadForm
                label="Hình ảnh sản phẩm"
                handleChange={setFileList}
                defaultFileList={fileList}
                width={100}
                height={100}
                listType="picture-card"
                accept="image/x-png,image/jpg,image/jpeg"
              />
            )}
          </Form>
        </Modal>
      )}
    </Formik>
  );
});

export default ProductForm;
