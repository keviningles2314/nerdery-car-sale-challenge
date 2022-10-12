import {
  GetAddCarFieldsQueryDocument,
  OrderBy,
  QueryGetCarsDocument,
} from "../../api/graphql/__generated__/graphql-types"

export const mockCarObject = {
  request: {
    query: QueryGetCarsDocument,
  },
  result: {
    data: {
      cars: [
        {
          batch: "521161a4-0022-452c-92c6-76fcfde50e4f",
          city: {
            __typename: "cities",
            name: "San Diego",
            id: 6,
            state: {
              __typename: "states",
              id: 2,
              name: "CALIFORNIA",
            },
          },
          color: {
            __typename: "colors",
            id: 3,
            name: "Black",
          },
          condition: "N",
          id: 236,
          model: {
            __typename: "models",
            id: 6,
            name: "corolla",
            brand: {
              __typename: "brands",
              id: 2,
              name: "Toyota",
            },
          },
          odometer: 45_000,
          price: "$10,600.00",
          saleDate: "2022-09-23",
          title: "Corolla 2017",
          vin: "MTE4584",
          year: 2017,
          damageType: "No damage",
          description: "No damage",
        },
      ],
    },
  },
}

export const mockEmptyObject = {
  request: {
    query: QueryGetCarsDocument,
    variables: {
      orderBy: [
        {
          saleDate: OrderBy.Desc,
        },
      ],
      where: {
        _or: [
          {
            title: {
              _iregex: "",
            },
          },
          {
            vin: {
              _iregex: "",
            },
          },
        ],
      },
    },
  },
  result: {
    data: {
      cars: [],
    },
  },
}

export const mockCarDetailObject = {
  request: {
    query: QueryGetCarsDocument,
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
          batch: "521161a4-0022-452c-92c6-76fcfde50e4f",
          city: {
            __typename: "cities",
            name: "San Diego",
            id: 6,
            state: {
              __typename: "states",
              id: 2,
              name: "CALIFORNIA",
            },
          },
          color: {
            __typename: "colors",
            id: 3,
            name: "Black",
          },
          condition: "N",
          damageType: "no damage",
          id: 2,
          model: {
            __typename: "models",
            id: 6,
            name: "corolla",
            brand: {
              __typename: "brands",
              id: 2,
              name: "Toyota",
            },
          },
          odometer: 45_000,
          price: "$10,600.00",
          saleDate: "2022-09-23",
          title: "Corolla 2017",
          vin: "MTE4584",
          year: 2017,
          description: "No damage",
        },
      ],
    },
  },
}

export const mockSelectData = {
  request: {
    query: GetAddCarFieldsQueryDocument,
  },
  result: {
    data: {
      brands: [
        {
          id: 2,
          name: "Jeep",
        },
      ],
      models: [
        {
          id: 2,
          name: "Patriot",
        },
      ],
      colors: [
        {
          id: 2,
          name: "Red",
        },
      ],
      states: [
        {
          id: 2,
          name: "Utah",
        },
      ],
      cities: [],
    },
  },
}

export const mockSelectModelsVariables = {
  request: {
    query: GetAddCarFieldsQueryDocument,
    variables: {
      modelsWhere: {
        brandId: {
          _eq: 2,
        },
      },
    },
  },
  result: {
    data: {
      brands: [
        {
          id: 2,
          name: "Jeep",
        },
      ],
      models: [
        {
          id: 2,
          name: "Patriot",
        },
      ],
      colors: [
        {
          id: 2,
          name: "Red",
        },
      ],
      states: [
        {
          id: 2,
          name: "Utah",
        },
      ],
      cities: [
        {
          id: 2,
          name: "Salt Lake",
          stateId: 2,
        },
      ],
    },
  },
}

export const mockSelectCityVariables = {
  request: {
    query: GetAddCarFieldsQueryDocument,
    variables: {
      where: {
        stateId: {
          _eq: 2,
        },
      },
    },
  },
  result: {
    data: {
      brands: [
        {
          id: 2,
          name: "Jeep",
        },
      ],
      models: [
        {
          id: 2,
          name: "Patriot",
        },
      ],
      colors: [
        {
          id: 2,
          name: "Red",
        },
      ],
      states: [
        {
          id: 2,
          name: "Utah",
        },
      ],
      cities: [
        {
          id: 2,
          name: "Provo",
          stateId: 2,
        },
      ],
    },
  },
}
