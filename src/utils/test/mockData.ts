import {
  Order_By,
  Query_GetCarsDocument,
} from '../../api/graphql/__generated__/graphql-types';

export const mockCarObject = {
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
          damage_type: 'No damage',
          description: 'No damage',
        },
      ],
    },
  },
};

export const mockEmptyObject = {
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
      cars: [],
    },
  },
};

export const mockCarDetailObject = {
  request: {
    query: Query_GetCarsDocument,
    variables: {
      where: {
        id: {
          _eq: 2,
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
          damage_type: 'no damage',
          id: 2,
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
