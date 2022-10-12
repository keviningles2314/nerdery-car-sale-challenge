import { MockedProvider } from "@apollo/client/testing"
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import { MutationCarsDocument } from "src/api/graphql/__generated__/graphql-types"
import {
  mockSelectCityVariables,
  mockSelectData,
  mockSelectModelsVariables,
} from "src/utils/test/mock-data"
import { fireEvent, render, screen, waitFor } from "src/utils/test/test-utils"
import AddCarForm from "./add-car-form"

describe("form functions", () => {
  it("Should shows error ", async () => {
    const { getByText, getByTestId } = render(
      <BrowserRouter>
        <MockedProvider mocks={[mockSelectData]} addTypename={false}>
          <AddCarForm />
        </MockedProvider>
      </BrowserRouter>
    )
    fireEvent.click(getByTestId("button"))
    await waitFor(
      () => {
        expect(getByText(/title is a required field/i)).toBeInTheDocument()
        expect(
          getByText(/description is a required field/i)
        ).toBeInTheDocument()
      },
      {
        timeout: 3000,
      }
    )
  })

  it("Should add a car", async () => {
    const mockCreateCar = {
      request: {
        query: MutationCarsDocument,
        variables: {
          objects: [
            {
              brandId: 2,
              modelId: 2,
              stateId: 2,
              cityId: 2,
              vin: "MX2003Q",
              year: 2022,
              saleDate: new Date().getDate(),
              odometer: 20_000,
              price: 30_000,
              condition: "A",
              title: "Jeep Patriot",
              batch: "f6d91eac-80fd-4313-98b7-c3ada5a58676",
              damageType: "No damage",
              colorId: 2,
              description: "No damage",
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
    }

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
      )
    const inputTitle = getByPlaceholderText(/title/i)
    const inputOdometer = getByPlaceholderText(/odometer/i)
    const inputVin = getByPlaceholderText(/vin/i)
    const inputPrice = getByPlaceholderText(/price/i)
    const inputDamage = getByPlaceholderText(/damage/i)
    const inputDescription = screen.getByPlaceholderText(/description/i)
    userEvent.type(inputTitle, "Jeep Patriot")
    userEvent.type(inputOdometer, "20000")
    userEvent.type(inputVin, "MX2003Q")
    userEvent.type(inputPrice, "30000")
    userEvent.type(inputDamage, "No damage")
    userEvent.type(inputDescription, "No damage")
    fireEvent.click(getByLabelText("A: Salvage Title"), {
      target: { value: "A" },
    })

    await waitFor(
      () => {
        userEvent.selectOptions(
          screen.getByTestId("brand"),
          screen.getByRole("option", { name: "Jeep" })
        )

        userEvent.selectOptions(
          screen.getByTestId("color"),
          screen.getByRole("option", { name: "Red" })
        )

        userEvent.selectOptions(
          screen.getByTestId("state"),
          screen.getByRole("option", { name: "Utah" })
        )
      },
      {
        timeout: 3000,
      }
    )
    await waitFor(
      () => {
        userEvent.selectOptions(
          screen.getByTestId("model"),
          screen.getByRole("option", { name: "Patriot" })
        )
        userEvent.selectOptions(
          screen.getByTestId("city"),
          screen.getByRole("option", { name: "Provo" })
        )
      },
      {
        timeout: 3000,
      }
    )
    expect(
      (screen.getByRole("option", { name: "Jeep" }) as HTMLOptionElement)
        .selected
    ).toBe(true)
    expect(
      (screen.getByRole("option", { name: "Patriot" }) as HTMLOptionElement)
        .selected
    ).toBe(true)
    expect(
      (screen.getByRole("option", { name: "Red" }) as HTMLOptionElement)
        .selected
    ).toBe(true)
    expect(
      (screen.getByRole("option", { name: "Utah" }) as HTMLOptionElement)
        .selected
    ).toBe(true)
    expect(
      (screen.getByRole("option", { name: "Provo" }) as HTMLOptionElement)
        .selected
    ).toBe(true)
    expect(inputTitle).toHaveValue("Jeep Patriot")
    expect(inputOdometer).toHaveValue("20000")
    expect(inputVin).toHaveValue("MX2003Q")
    expect(inputPrice).toHaveValue("30000")
    expect(inputDamage).toHaveValue("No damage")
    expect(inputDescription).toHaveValue("No damage")
    expect(getByLabelText("A: Salvage Title")).toBeChecked()
    fireEvent.click(getByTestId("button"))

    expect(await findByText(/creation complete/i)).toBeInTheDocument()
  })
})
