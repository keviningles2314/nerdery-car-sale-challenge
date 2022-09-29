import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { Mutation_CarsDocument } from 'src/api/graphql/__generated__/graphql-types';
import { mockSelectData } from 'src/utils/test/mockData';
import { fireEvent, render, waitFor } from 'src/utils/test/test-utils';
import { v4 } from 'uuid';
import AddCarForm from './AddCarForm';

describe('form functions', () => {
  it('Should shows error ', async () => {
    const { getByText, getByTestId } = render(
      <BrowserRouter>
        <MockedProvider mocks={[mockSelectData]}>
          <AddCarForm />
        </MockedProvider>
      </BrowserRouter>
    );
    fireEvent.click(getByTestId('button'));
    await waitFor(
      () => {
        expect(getByText(/Title is a required field/i)).toBeInTheDocument();
        expect(
          getByText(/Description is a required field/i)
        ).toBeInTheDocument();
      },
      {
        timeout: 3000,
      }
    );
  });

  it('Should add a car', async () => {
    const mockCreateCar = {
      request: {
        query: Mutation_CarsDocument,
        variables: {
          object: {
            brand_id: 3,
            model_id: 3,
            state_id: 3,
            city_id: 3,
            vin: 'MLX4545',
            year: 2020,
            sale_date: '2022-12-20',
            odometer: '15000',
            price: '10000',
            condition: 'A',
            title: 'Ford mustant 2020',
            batch: v4(),
            damage: 'no damage',
            color_id: 3,
            description: 'Nice car',
          },
        },
      },
      result: {
        data: {
          returning: {
            year: 2020,
          },
        },
      },
    };
    const { getByText, getByTestId, getByPlaceholderText } = render(
      <BrowserRouter>
        <MockedProvider mocks={[mockSelectData, mockCreateCar]}>
          <AddCarForm />
        </MockedProvider>
      </BrowserRouter>
    );
    const inputTitle = getByPlaceholderText(/title/i);
    const inputOdometer = getByPlaceholderText(/odometer/i);
    const inputVin = getByPlaceholderText(/vin/i);
    const inputPrice = getByPlaceholderText(/price/i);
    const inputDamage = getByPlaceholderText(/damage/i);
    const inputDescription = getByPlaceholderText(/description/i);
    await act(async () => {
      fireEvent.change(inputTitle, {
        target: { value: 'Ford mustang' },
      });
      fireEvent.change(inputOdometer, {
        target: { value: 20000 },
      });
      fireEvent.change(inputVin, {
        target: { value: 'MX2003Q' },
      });
      fireEvent.change(inputPrice, {
        target: { value: 30000 },
      });
      fireEvent.change(inputDamage, {
        target: { value: 'No damage' },
      });
      fireEvent.change(inputDescription, {
        target: { value: 'No damage' },
      });
    });
    await waitFor(
      async () => {
        await userEvent.selectOptions(getByTestId('brand'), 'Jeep');
      },
      {
        timeout: 1000,
      }
    );

    expect(inputTitle).toHaveValue('Ford mustang');
    expect(inputOdometer).toHaveValue('20000');
    expect(inputVin).toHaveValue('MX2003Q');
    expect(inputPrice).toHaveValue('30000');
    expect(inputDamage).toHaveValue('No damage');
    expect(inputDescription).toHaveValue('No damage');
    expect(getByTestId('brand')).toHaveValue('2');

    await waitFor(
      async () => {
        await act(async () => {
          fireEvent.click(getByTestId('button'));
        });
      },
      {
        timeout: 2000,
      }
    );

    await waitFor(
      async () => {
        await expect(await getByText(/Creation Complete/i)).toBeInTheDocument();
      },
      {
        timeout: 3000,
      }
    );

    // fireEvent.change(getByText(/Select Color/i), { target: { value: 2 } });
    // expect(getByText('Red')).toBeInTheDocument();
    // fireEvent.change(getByText(/Select State/i), { target: { value: 2 } });
    // expect(getByText(/utah/i)).toBeInTheDocument();
  });
});
