import { MockedProvider } from "@apollo/client/testing"
import { screen, waitFor } from "@testing-library/react"
import { render } from "../../utils/test/test-utils"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { mockCarDetailObject } from "../../utils/test/mock-data"
import CarDetail from "./car-detail"

describe("Car detail page", () => {
  it("Should render car detail page", () => {
    render(<CarDetail />)

    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it("Should display a car info", async () => {
    const carMock = mockCarDetailObject
    render(
      <MockedProvider mocks={[carMock]} addTypename={false}>
        <MemoryRouter initialEntries={["/car/2"]}>
          <Routes>
            <Route path="/car/:idCar" element={<CarDetail />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    )
    await waitFor(() => {
      expect(screen.getByText(/mte4584/i)).toBeInTheDocument()
    })
  })
})
