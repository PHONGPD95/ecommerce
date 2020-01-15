import { Module } from '@nestjs/common';

import { FileResolver } from './file.resolver';
import { FileService } from './file.service';

@Module({
  providers: [FileResolver, FileService],
  exports: [FileService],
})
export class FileModule {}
