import "react-datepicker/dist/react-datepicker.css"
import { useForm, SubmitHandler, FormProvider } from "react-hook-form"
import {
  Cars,
  useMutationCarsMutation,
} from "../../api/graphql/__generated__/graphql-types"
import { defaultFormValuesObject, yupSchema } from "../../helpers/object-values"
import Button from "../button/button"
import ErrorMessage from "../error-message/error-message"
import { Container, Form } from "./add-car-styled"

import { yupResolver } from "@hookform/resolvers/yup"

import { v4 as uuidv4 } from "uuid"
import { useState } from "react"
import SuccessCreationMessage from "../success-creation-message/success-creation-message"
import { GET_CARS } from "../../api/graphql/query/cars"
import AddCarFormFields from "./add-car-form-fields/add-car-form-fields"

export type FormInput = {
  price: number | null
  odometer: number | null
  vin: string
  title: string
  damage: string
  year: Date
  description: string
  saleDate: Date
  condition: string
  brand: number | null
  model: number | null
  color: number | null
  state: number | null
  city: number | null
}

const AddCar = () => {
  const methods = useForm<FormInput>({
    resolver: yupResolver(yupSchema),
    defaultValues: defaultFormValuesObject,
  })

  const [insertCar, { loading: mutationLoading, error: mutationError }] =
    useMutationCarsMutation()

  const [isSuccessCreation, setIsSuccessCreation] = useState(false)

  const onSubmit: SubmitHandler<FormInput> = async (dataForm) => {
    const formObjects = {
      batch: uuidv4(),
      odometer: dataForm.odometer,
      brandId: dataForm.brand,
      colorId: dataForm.color,
      condition: dataForm.condition,
      damageType: dataForm.damage,
      description: dataForm.description,
      price: dataForm.price,
      modelId: dataForm.model,
      stateId: dataForm.state,
      cityId: dataForm.city,
      saleDate: dataForm.saleDate,
      title: dataForm.title,
      vin: dataForm.vin,
      year: Number(dataForm.year.getFullYear()),
    }
    setIsSuccessCreation(false)
    await insertCar({
      variables: {
        objects: [formObjects],
      },
      onCompleted: (dataCompleted) => {
        if (
          dataCompleted.insertCars &&
          dataCompleted.insertCars.returning.length > 0
        ) {
          methods.reset(defaultFormValuesObject)
          setIsSuccessCreation(true)
        }
      },

      optimisticResponse: {
        __typename: "mutation_root",
        insertCars: {
          __typename: "cars_mutation_response",
          returning: [formObjects],
        },
      },
      update: (proxy, response) => {
        const previousData = proxy.readQuery<{ cars: Cars[] }>({
          query: GET_CARS,
        })

        if (previousData) {
          proxy.writeQuery({
            query: GET_CARS,

            data: {
              ...previousData,
              cars: response.data
                ? [response.data.insertCars, ...previousData.cars]
                : null,
            },
          })
        } else {
          proxy.writeQuery({
            query: GET_CARS,
            data: {
              cars: response.data ? [response.data.insertCars] : null,
            },
          })
        }
      },
    })
  }
  return (
    <Container>
      <FormProvider {...methods}>
        <Form data-testid="form">
          <AddCarFormFields />
          <Button
            title={mutationLoading ? "Creating..." : "Create"}
            onClick={methods.handleSubmit(onSubmit)}
            disabled={Boolean(mutationLoading)}
          />
          {mutationError ? (
            <ErrorMessage message={mutationError.message} />
          ) : null}
          {isSuccessCreation ? <SuccessCreationMessage /> : null}
        </Form>
      </FormProvider>
    </Container>
  )
}
export default AddCar
