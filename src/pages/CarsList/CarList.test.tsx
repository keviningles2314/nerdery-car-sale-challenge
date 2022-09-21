import { ApolloProvider } from '@apollo/client';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { client } from '../../index';
import { LoginContextProvider } from '../../context/LoginContext/LoginContext';
import CarList from './CarsList';
import { Order_By } from '../../api/graphql/__generated__/graphql-types';
import { MockedProvider } from '@apollo/client/testing';
import { Query_GetCarsDocument } from '../../api/graphql/__generated__/graphql-types';

describe('Car list page', () => {
  it('Should render car list page', async () => {
    render(
      <React.StrictMode>
        <ApolloProvider client={client}>
          <LoginContextProvider>
            <BrowserRouter>
              <CarList />
            </BrowserRouter>
          </LoginContextProvider>
        </ApolloProvider>
      </React.StrictMode>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('Should render a car', async () => {
    const carMock = {
      request: {
        query: Query_GetCarsDocument,
        variables: {
          orderBy: [
            {
              sale_date: Order_By.Desc,
            },
          ],
          where: {
            _or: [
              {
                title: {
                  _iregex: '',
                },
              },
              {
                vin: {
                  _iregex: '',
                },
              },
            ],
            id: {
              _in: undefined,
            },
          },
        },
      },
      result: {
        data: {
          cars: [
            {
              batch: '521161a4-0022-452c-92c6-76fcfde50e4f',
              city: {
                __typename: 'cities',
                name: 'San Diego',
                id: 6,
                state: {
                  __typename: 'states',
                  id: 2,
                  name: 'CALIFORNIA',
                },
              },
              color: {
                __typename: 'colors',
                id: 3,
                name: 'Black',
              },
              condition: 'N',
              id: 236,
              model: {
                __typename: 'models',
                id: 6,
                name: 'corolla',
                brand: {
                  __typename: 'brands',
                  id: 2,
                  name: 'Toyota',
                },
              },
              odometer: 45000,
              price: '$10,600.00',
              sale_date: '2022-09-23',
              title: 'Corolla 2017',
              vin: 'MTE4584',
              year: 2017,
              description: 'No damage',
            },
          ],
        },
      },
    };
    render(
      <React.StrictMode>
        <ApolloProvider client={client}>
          <LoginContextProvider>
            <BrowserRouter>
              <MockedProvider mocks={[carMock]} addTypename={false}>
                <CarList />
              </MockedProvider>
            </BrowserRouter>
          </LoginContextProvider>
        </ApolloProvider>
      </React.StrictMode>
    );
    await waitFor(() => {
      expect(screen.getByText(/toyota corolla/i)).toBeInTheDocument();
    });
  });
});
