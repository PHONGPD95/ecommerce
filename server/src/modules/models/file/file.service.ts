import { minioClient } from '~utils/minio';

import { File } from './file.model';

export const uploadFileDefaultExpire = 3600;
export const bucketName = 'client';

export class FileService {
  public async createFile(): Promise<File> {
    const idWithExt = `file-${Date.now()}`;

    const path = await minioClient.presignedPutObject(
      bucketName,
      idWithExt,
      uploadFileDefaultExpire,
    );

    const data = { path, id: idWithExt };
    return data;
  }

  public async findFileById(id: string): Promise<File> {
    const path = await minioClient.presignedGetObject(bucketName, id);

    const data = { id, path };
    return data;
  }

  public async removeFileById(id: string): Promise<File> {
    await minioClient.removeObject(bucketName, id);

    return { id };
  }
}
