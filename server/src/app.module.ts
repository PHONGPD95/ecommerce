import '~graphql/replace-metadata';

import { RequestContextMiddleware } from '~context/index';
import { MongoModule } from '~database/mongo.module';
import { GraphQlModule } from '~graphql/graphql.module';
import { CommonModule } from '~modules/models/common/common.module';
import { FileModule } from '~modules/models/file/file.module';
import { MessageModule } from '~modules/models/message/message.module';
import { OrderModule } from '~modules/models/order/order.module';
import { ProductModule } from '~modules/models/product/product.module';
import { ProfileModule } from '~modules/models/profile/profile.module';
import { RoleModule } from '~modules/models/role/role.module';
import { UserModule } from '~modules/models/user/user.module';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

@Module({
  imports: [
    MongoModule,
    GraphQlModule,
    RoleModule,
    ProfileModule,
    UserModule,
    CommonModule,
    ProductModule,
    FileModule,
    MessageModule,
    OrderModule
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
