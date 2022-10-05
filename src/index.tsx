import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'x-hasura-admin-secret': process.env.REACT_APP_API_KEY,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false,
  }),
  connectToDevTools: true,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') || document.createElement('div')
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
