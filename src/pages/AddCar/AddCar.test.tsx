import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useGet_Add_Car_Fields_QueryLazyQuery } from '../../api/graphql/__generated__/graphql-types';
import {
  cleanup,
  fireEvent,
  render,
  renderHook,
  waitFor,
} from '../../utils/test/test-utils';
import AddCar from './AddCar';
import { mockSelectData } from '../../utils/test/mockData';
import { mocked } from 'jest-mock';

describe('Add a car Page', () => {
  it('Should Render add a car page and form', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <AddCar />
      </BrowserRouter>
    );
    expect(getByText(/Add a car/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(getByText(/sale Date/i)).toBeInTheDocument();
    });
  });

  it('should render brand, color , state', async () => {
    const { getByTestId, getByText } = render(
      <MockedProvider mocks={[mockSelectData]} addTypename={false}>
        <BrowserRouter>
          <AddCar />
        </BrowserRouter>
      </MockedProvider>
    );
    expect(getByTestId('form')).toBeInTheDocument();
    expect(getByText(/Select Brand/i)).toBeInTheDocument();
    await waitFor(
      async () => {
        fireEvent.click(getByTestId('brand'), { target: { value: 2 } });
        await expect(getByText(/Jeep/i)).toBeInTheDocument();
        fireEvent.click(getByText(/Select Color/i), { target: { value: 2 } });
        await expect(getByText('Red')).toBeInTheDocument();
        fireEvent.click(getByText(/Select State/i), { target: { value: 2 } });
        await expect(getByText(/utah/i)).toBeInTheDocument();
      },
      {
        timeout: 3000,
      }
    );
  });
});
