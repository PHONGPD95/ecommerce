import moment from 'moment';

export const DATE_FORMAT = "DD/MM/YYYY";
export const TIME_FORMAT = "HH:mm";
export const DATETIME_FORMAT = [DATE_FORMAT, TIME_FORMAT].join(" ");

export const formatTime = (date: Date | string, format = DATETIME_FORMAT) =>
  date && moment(date).format(format);
export const formatTimeForIOReport = (date: Date | string) =>
  moment(date).format("DD/MM/YY");
