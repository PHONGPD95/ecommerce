import { InjectModel } from 'nestjs-typegoose';
import { BaseService } from '~modules/base/base.service';

import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';

import { Message } from './message.model';

@Injectable()
export class MessageService extends BaseService<Message> {
  constructor(
    @InjectModel(Message)
    protected readonly model: ReturnModelType<typeof Message>,
  ) {
    super();
  }
}
