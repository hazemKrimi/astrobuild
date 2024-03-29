import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './themes';
import App from './App';
import GlobalStyles from './GlobalStyles';
import reportWebVitals from './reportWebVitals';

const httpLinkMain = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_API,
});

const httpLinkSupport = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_SUPPORT_API,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${import.meta.env.VITE_GRAPHQL_SUPPORT_SUBSCRIPTIONS_API}`,
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLinkSupport
);

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token || '',
    },
  };
});

export const clientMain = new ApolloClient({
  link: authLink.concat(httpLinkMain),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-and-network',
    },
  }
});

export const clientSupport = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-and-network',
    },
  }
});

let root: ReactDOMClient.Root | null = null;

document.addEventListener('DOMContentLoaded', () => {
  if (!root) {
    root = ReactDOMClient.createRoot(
      document.querySelector('#app') as HTMLElement
    );

    root.render(
      <React.StrictMode>
        <ApolloProvider client={clientMain}>
          {/* @ts-ignore */}
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <App />
              {/* @ts-ignore */}
              <GlobalStyles />
            </BrowserRouter>
          </ThemeProvider>
        </ApolloProvider>
      </React.StrictMode>
    );
  }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
