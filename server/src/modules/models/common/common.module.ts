import { TypegooseModule } from 'nestjs-typegoose';

import { Module } from '@nestjs/common';

import { Common } from './common.model';
import { CommonResolver } from './common.resolver';
import { CommonService } from './common.service';

@Module({
  imports: [TypegooseModule.forFeature([Common])],
  providers: [CommonService, CommonResolver],
})
export class CommonModule {}
