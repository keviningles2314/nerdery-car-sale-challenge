import { MockedProvider } from "@apollo/client/testing"
import { BrowserRouter } from "react-router-dom"
import { fireEvent, render, waitFor } from "../../utils/test/test-utils"
import AddCar from "./add-car"
import { mockSelectData } from "../../utils/test/mock-data"

describe("Add a car Page", () => {
  it("Should Render add a car page and form", async () => {
    const { getByText } = render(
      <BrowserRouter>
        <AddCar />
      </BrowserRouter>
    )
    expect(getByText(/add a car/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(getByText(/sale date/i)).toBeInTheDocument()
    })
  })

  it("should render brand, color , state", async () => {
    const { getByTestId, getByText } = render(
      <MockedProvider mocks={[mockSelectData]} addTypename={false}>
        <BrowserRouter>
          <AddCar />
        </BrowserRouter>
      </MockedProvider>
    )
    expect(getByTestId("form")).toBeInTheDocument()
    expect(getByText(/select brand/i)).toBeInTheDocument()
    await waitFor(
      async () => {
        fireEvent.click(getByTestId("brand"), { target: { value: 2 } })
        await expect(getByText(/jeep/i)).toBeInTheDocument()
        fireEvent.click(getByText(/select color/i), { target: { value: 2 } })
        await expect(getByText("Red")).toBeInTheDocument()
        fireEvent.click(getByText(/select state/i), { target: { value: 2 } })
        await expect(getByText(/utah/i)).toBeInTheDocument()
      },
      {
        timeout: 3000,
      }
    )
  })
})
