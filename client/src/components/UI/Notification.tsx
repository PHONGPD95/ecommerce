import { notification } from 'antd';

notification.config({
  placement: 'bottomRight',
  duration: 3,
});

type NotiType = 'success' | 'info' | 'warning' | 'error';

const showNoti = (type: NotiType, message: string, description = '') => {
  notification[type]({
    message,
    description,
  });
};

export const SuccessNoti = (message: string, description?: string) =>
  showNoti('success', `${message} thành công!`, description);

export const ErrorNoti = (message: string, description?: string) => showNoti('error', message, description);

export const WarningNoti = (message: string, description?: string) => showNoti('warning', message, description);

export const InfoNoti = (message: string, description?: string) => showNoti('info', message, description);
