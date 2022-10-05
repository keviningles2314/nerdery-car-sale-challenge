import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Mutation_CarsDocument } from 'src/api/graphql/__generated__/graphql-types';
import {
  mockSelectCityVariables,
  mockSelectData,
  mockSelectModelsVariables,
} from 'src/utils/test/mockData';
import { fireEvent, render, screen, waitFor } from 'src/utils/test/test-utils';
import { v4 } from 'uuid';
import AddCarForm from './AddCarForm';

describe('form functions', () => {
  it('Should shows error ', async () => {
    const { getByText, getByTestId } = render(
      <BrowserRouter>
        <MockedProvider mocks={[mockSelectData]} addTypename={false}>
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
          objects: [
            {
              brand_id: 2,
              model_id: 2,
              state_id: 2,
              city_id: 2,
              vin: 'MX2003Q',
              year: 2022,
              sale_date: new Date().getDate(),
              odometer: 20000,
              price: 30000,
              condition: 'A',
              title: 'Jeep Patriot',
              batch: 'f6d91eac-80fd-4313-98b7-c3ada5a58676',
              damage_type: 'No damage',
              color_id: 2,
              description: 'No damage',
            },
          ],
        },
      },
      result: {
        data: {
          returning: {
            year: 2022,
          },
        },
      },
    };

    const { findByText, getByTestId, getByPlaceholderText, getByLabelText } =
      render(
        <BrowserRouter>
          <MockedProvider
            mocks={[
              mockSelectData,
              mockSelectModelsVariables,
              mockSelectCityVariables,
              mockCreateCar,
            ]}
            addTypename={false}
          >
            <AddCarForm />
          </MockedProvider>
        </BrowserRouter>
      );
    const inputTitle = getByPlaceholderText(/title/i);
    const inputOdometer = getByPlaceholderText(/odometer/i);
    const inputVin = getByPlaceholderText(/vin/i);
    const inputPrice = getByPlaceholderText(/price/i);
    const inputDamage = getByPlaceholderText(/damage/i);
    const inputDescription = screen.getByPlaceholderText(/description/i);
    userEvent.type(inputTitle, 'Jeep Patriot');
    userEvent.type(inputOdometer, '20000');
    userEvent.type(inputVin, 'MX2003Q');
    userEvent.type(inputPrice, '30000');
    userEvent.type(inputDamage, 'No damage');
    userEvent.type(inputDescription, 'No damage');
    fireEvent.click(getByLabelText('A: Salvage Title'), {
      target: { value: 'A' },
    });

    await waitFor(
      async () => {
        userEvent.selectOptions(
          screen.getByTestId('brand'),
          screen.getByRole('option', { name: 'Jeep' })
        );

        userEvent.selectOptions(
          screen.getByTestId('color'),
          screen.getByRole('option', { name: 'Red' })
        );

        userEvent.selectOptions(
          screen.getByTestId('state'),
          screen.getByRole('option', { name: 'Utah' })
        );
      },
      {
        timeout: 3000,
      }
    );
    await waitFor(
      async () => {
        userEvent.selectOptions(
          screen.getByTestId('model'),
          screen.getByRole('option', { name: 'Patriot' })
        );
        userEvent.selectOptions(
          screen.getByTestId('city'),
          screen.getByRole('option', { name: 'Provo' })
        );
      },
      {
        timeout: 3000,
      }
    );
    expect(
      (screen.getByRole('option', { name: 'Jeep' }) as HTMLOptionElement)
        .selected
    ).toBe(true);
    expect(
      (screen.getByRole('option', { name: 'Patriot' }) as HTMLOptionElement)
        .selected
    ).toBe(true);
    expect(
      (screen.getByRole('option', { name: 'Red' }) as HTMLOptionElement)
        .selected
    ).toBe(true);
    expect(
      (screen.getByRole('option', { name: 'Utah' }) as HTMLOptionElement)
        .selected
    ).toBe(true);
    expect(
      (screen.getByRole('option', { name: 'Provo' }) as HTMLOptionElement)
        .selected
    ).toBe(true);
    expect(inputTitle).toHaveValue('Jeep Patriot');
    expect(inputOdometer).toHaveValue('20000');
    expect(inputVin).toHaveValue('MX2003Q');
    expect(inputPrice).toHaveValue('30000');
    expect(inputDamage).toHaveValue('No damage');
    expect(inputDescription).toHaveValue('No damage');
    expect(getByLabelText('A: Salvage Title')).toBeChecked();
    fireEvent.click(getByTestId('button'));

    expect(await findByText(/Creation Complete/i)).toBeInTheDocument();
  });
});
