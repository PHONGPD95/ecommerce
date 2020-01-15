import { Client } from 'minio';

export const minioClient = new Client({
  endPoint: '127.0.0.1',
  port: 9000,
  useSSL: false,
  accessKey: '123',
  secretKey: '123123123',
});
