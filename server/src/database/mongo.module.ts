import { TypegooseModule } from 'nestjs-typegoose';

import { Module } from '@nestjs/common';

const uri = 'mongodb://localhost:27017/ecommerce';

@Module({
  imports: [
    TypegooseModule.forRoot(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
})
export class MongoModule {}
