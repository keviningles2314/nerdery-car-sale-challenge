import { screen, waitFor } from '@testing-library/react';
import { render } from '../../utils/test/test-utils';
import React from 'react';
import CarList from './CarsList';
import { Order_By } from '../../api/graphql/__generated__/graphql-types';
import { MockedProvider } from '@apollo/client/testing';
import { Query_GetCarsDocument } from '../../api/graphql/__generated__/graphql-types';
import { GraphQLError } from 'graphql';
import { mockCarObject, mockEmptyObject } from '../../utils/test/mockData';
import { BrowserRouter } from 'react-router-dom';

describe('Car list page', () => {
  it('Should render car list page', async () => {
    render(
      <BrowserRouter>
        <CarList />
      </BrowserRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('Should render a car', async () => {
    const carsMock = mockCarObject;
    render(
      <BrowserRouter>
        <MockedProvider mocks={[carsMock]} addTypename={false}>
          <CarList />
        </MockedProvider>
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/toyota corolla/i)).toBeInTheDocument();
    });
  });

  it('should show a graphql error', async () => {
    const carsErrorData = {
      request: {
        query: Query_GetCarsDocument,
      },
      result: {
        errors: [new GraphQLError('Error!')],
      },
    };
    render(
      <BrowserRouter>
        <MockedProvider mocks={[carsErrorData]} addTypename={false}>
          <CarList />
        </MockedProvider>
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/Error/i)).toBeInTheDocument();
    });
  });
});
