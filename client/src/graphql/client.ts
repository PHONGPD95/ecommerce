import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { ErrorNoti } from '~components/UI';
import commonStore from '~stores/commonStore';

const httpLink = new HttpLink({ uri: "http://localhost:8080/graphql" });

const wsLink = new WebSocketLink({
  uri: `ws://localhost:8080/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      authorization: commonStore.token,
    }
  }
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const authLink = setContext((_, { headers }) => {
  const reqHeaders = {
    ...headers
  };
  if (commonStore.token) {
    reqHeaders.authorization = commonStore.token;
  }
  return { headers: reqHeaders };
});

const httpLinkWithAuthToken = authLink.concat(link);

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => {
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );

          return ErrorNoti(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
        });
      }
      if (networkError) {
        console.error(`[Network error]: ${networkError}`);
        return ErrorNoti(`[Network error]:${networkError}`);
      }
    }),
    httpLinkWithAuthToken
  ]),
  cache: new InMemoryCache({})
});

(window as any).__APOLLO_CLIENT__ = client;

export default client;
