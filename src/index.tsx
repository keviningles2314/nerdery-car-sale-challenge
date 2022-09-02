import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloClient,
  HttpLink,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'https://new-anchovy-87.hasura.app/v1/graphql',
});

const authLink = setContext((_, { headers }) => {
  const key = process.env.REACT_APP_API_KEY;

  return {
    headers: {
      ...headers,
      'x-hasura-admin-secret': key,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
