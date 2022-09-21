import { ApolloProvider } from '@apollo/client';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LoginContextProvider } from '../../context/LoginContext/LoginContext';
import Login from './Login';
import { client } from '../../index';
import React from 'react';
describe('Login Page', () => {
  it('should render Login page', () => {
    render(
      <React.StrictMode>
        <ApolloProvider client={client}>
          <LoginContextProvider>
            <BrowserRouter>
              <Login />
            </BrowserRouter>
          </LoginContextProvider>
        </ApolloProvider>
      </React.StrictMode>
    );
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });
});
