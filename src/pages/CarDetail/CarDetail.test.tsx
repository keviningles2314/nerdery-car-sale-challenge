import { ApolloProvider } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { screen, waitFor } from '@testing-library/react';
import { render } from '../../utils/test/test-utils';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { LoginContextProvider } from '../../context/LoginContext/LoginContext';
import { client } from '../../index';
import { mockCarDetailObject } from '../../utils/test/mockData';
import CarDetail from './CarDetail';

describe('Car detail page', () => {
  it('Should render car detail page', () => {
    render(<CarDetail />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('Should display a car info', async () => {
    const carMock = mockCarDetailObject;
    render(
      <MockedProvider mocks={[carMock]} addTypename={false}>
        <MemoryRouter initialEntries={['/car/2']}>
          <Routes>
            <Route path='/car/:idCar' element={<CarDetail />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );
    await waitFor(() => {
      expect(screen.getByText(/MTE4584/i)).toBeInTheDocument();
    });
  });
});
