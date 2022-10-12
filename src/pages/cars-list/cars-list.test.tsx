import { screen, waitFor } from "@testing-library/react"
import { render } from "../../utils/test/test-utils"
import CarList from "./cars-list"
import { MockedProvider } from "@apollo/client/testing"
import { QueryGetCarsDocument } from "../../api/graphql/__generated__/graphql-types"
import { GraphQLError } from "graphql"
import { mockCarObject } from "../../utils/test/mock-data"
import { BrowserRouter } from "react-router-dom"

describe("Car list page", () => {
  it("Should render car list page", () => {
    render(
      <BrowserRouter>
        <CarList />
      </BrowserRouter>
    )

    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it("Should render a car", async () => {
    const carsMock = mockCarObject
    render(
      <BrowserRouter>
        <MockedProvider mocks={[carsMock]} addTypename={false}>
          <CarList />
        </MockedProvider>
      </BrowserRouter>
    )
    await waitFor(() => {
      expect(screen.getByText(/toyota corolla/i)).toBeInTheDocument()
    })
  })

  it("should show a graphql error", async () => {
    const carsErrorData = {
      request: {
        query: QueryGetCarsDocument,
      },
      result: {
        errors: [new GraphQLError("Error!")],
      },
    }
    render(
      <BrowserRouter>
        <MockedProvider mocks={[carsErrorData]} addTypename={false}>
          <CarList />
        </MockedProvider>
      </BrowserRouter>
    )
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument()
    })
  })
})
