import { TypegooseModule } from 'nestjs-typegoose';

import { Module } from '@nestjs/common';

import { Message } from './message.model';
import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';

@Module({
  imports: [TypegooseModule.forFeature([Message])],
  providers: [MessageService, MessageResolver],
})
export class MessageModule {}
