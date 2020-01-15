import { PubSub } from 'graphql-subscriptions';
import { get } from 'lodash';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { DbLoaderManager } from '~base/dataloader';
import { authChecker, getCurrentUserInfo, IIncomingMessage } from '~graphql/auth';
import { IContext } from '~graphql/types/graphql-context';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useFactory: async () => {
        const pubSub = new PubSub();

        const schema = await buildSchema({
          authChecker,
          resolvers: [() => null],
          container: Container,
          validate: false,
          pubSub,
        });

        const config = {
          schema,
          context: async ({ req, connection }): Promise<IContext> => {
            if (connection) {
              return connection.context;
            } else {
              return {
                loaderManager: new DbLoaderManager(),
                authInfo: await getCurrentUserInfo(req),
              };
            }
          },
          subscriptions: {
            onConnect: async connectionParams => {
              if (connectionParams.authorization) {
                const req = { headers: connectionParams };
                return {
                  loaderManager: new DbLoaderManager(),
                  authInfo: await getCurrentUserInfo(req as IIncomingMessage),
                };
              }
              // throw Error('Missing token!');
            },
          },
          installSubscriptionHandlers: true,
        };
        return config;
      },
    }),
  ],
})
export class GraphQlModule {}
