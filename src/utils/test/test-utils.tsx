import { ApolloProvider } from '@apollo/client';
import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { client } from '../../index';
import { LoginContextProvider } from '../../context/LoginContext/LoginContext';

interface NestedProvidersProps {
  children: ReactNode;
}

const NestedProviders = ({ children }: NestedProvidersProps) => {
  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <LoginContextProvider>{children}</LoginContextProvider>
      </ApolloProvider>
    </React.StrictMode>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: NestedProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
