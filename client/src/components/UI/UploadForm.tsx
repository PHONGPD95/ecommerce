import { Button, Form, Icon, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { UploadProps } from 'antd/lib/upload';
import { RcCustomRequestOptions, UploadFile } from 'antd/lib/upload/interface';
import axios from 'axios';
import React, { FC, Fragment, useEffect, useState } from 'react';
import client from '~graphql/client';
import { CREATE_FILE, REMOVE_FILE_BY_ID } from '~graphql/mutations';
import { FIND_FILE_BY_ID } from '~graphql/queries';
import {
    CreateFile, FindFileById, FindFileByIdVariables, RemoveFileById, RemoveFileByIdVariables
} from '~graphql/types';

import { ErrorNoti } from './Notification';

interface Props extends UploadProps {
  label?: string;
  description?: string;
  quantity?: number;
  width?: number;
  height?: number;
  handleChange: (fileList: UploadFile[]) => void;
}

const UploadForm: FC<Props> = ({
  label,
  description,
  quantity,
  handleChange,
  defaultFileList,
  width,
  height,
  ...rest
}) => {
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    setFileList(defaultFileList || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleChange(fileList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileList]);

  const uploadFile = async ({
    onSuccess,
    onError,
    file
  }: RcCustomRequestOptions) => {
    const { data } = await client.mutate<CreateFile>({ mutation: CREATE_FILE });

    if (data!.createFile.error) {
      return ErrorNoti(data!.createFile.error.message);
    }

    const { path: uploadUrl, id } = data!.createFile.data!;

    const options = {
      headers: {
        "Content-Type": file.type
      }
    };

    await axios
      .put(uploadUrl!, file, options)
      .then(async res => {
        const { data } = await client.mutate<
          FindFileById,
          FindFileByIdVariables
        >({ mutation: FIND_FILE_BY_ID, variables: { id } });

        if (data!.findFileById.error) {
          return ErrorNoti(data!.findFileById.error.message);
        }

        const { path: viewUrl } = data!.findFileById.data!;

        const fileData: UploadFile = {
          uid: id,
          name: id,
          url: viewUrl!,
          type: file.type,
          size: file.size
        };

        setFileList([...fileList, fileData]);
        onSuccess(res, file);
      })
      .catch(err => {
        onError(err);
      });
  };

  const removeFile = async (file: UploadFile<any>) => {
    const { data } = await client.mutate<
      RemoveFileById,
      RemoveFileByIdVariables
    >({
      mutation: REMOVE_FILE_BY_ID,
      variables: { id: file.uid }
    });

    if (data!.removeFileById.error) {
      return ErrorNoti(data!.removeFileById.error!.message);
    } else {
      const index = fileList.findIndex(f => f.uid === file.uid);

      setFileList([
        ...fileList.slice(0, index),
        ...fileList.slice(index + 1, fileList.length)
      ]);
    }
  };

  const uploadProps: UploadProps = {
    ...rest,
    fileList,
    customRequest: async option => {
      setUploading(true);
      await uploadFile(option);
      setUploading(false);
    },
    onRemove: file => {
      removeFile(file);
    }
  };

  const imgCropProps = {
    modalTitle: "Chỉnh sửa ảnh",
    width,
    height
  };

  const uploadButton =
    rest.listType === "picture-card" ? (
      <Fragment>
        <Icon type={uploading ? "loading" : "plus"} />
        <div className="ant-upload-text">Tải file lên</div>
      </Fragment>
    ) : (
      <Button icon="upload" loading={uploading}>
        Upload
      </Button>
    );

  const uploadRender =
    rest.listType === "text" ? (
      <Upload {...uploadProps}>
        {fileList.length >= (quantity || 8) ? null : uploadButton}
      </Upload>
    ) : (
      <ImgCrop {...imgCropProps}>
        <Upload {...uploadProps}>
          {fileList.length >= (quantity || 8) ? null : uploadButton}
        </Upload>
      </ImgCrop>
    );
  return (
    <Form.Item label={label}>
      {uploadRender}
      <small>{description}</small>
    </Form.Item>
  );
};
export default UploadForm;
