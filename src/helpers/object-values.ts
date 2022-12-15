import * as yup from "yup"

export const fieldNameValues = {
  title: "title",
  odometer: "odometer",
  vin: "vin",
  price: "price",
  damage: "damage",
  year: "year",
  description: "description",
  saleDate: "saleDate",
}

export const defaultImagePath =
  "https://cs.copart.com/v1/AUTH_svc.pdoc00001/LPP351/bd59842d8adb41af996749fdfeedba6e_ful.jpg"

export const defaultFormValuesObject = {
  title: "",
  odometer: null,
  vin: "",
  brand: null,
  model: null,
  saleDate: new Date(),
  price: null,
  condition: "",
  damage: "",
  year: new Date(),
  color: null,
  state: null,
  city: null,
  description: "",
}
export const yupSchema = yup.object().shape({
  title: yup.string().required(),
  odometer: yup
    .number()
    .required()
    .positive()
    .typeError("Please insert a valid ODOmeter"),
  vin: yup.string().required(),
  price: yup
    .number()
    .required()
    .positive()
    .typeError("Please insert a valid Price"),
  damage: yup.string().required(),
  description: yup.string().required(),
  saleDate: yup.date().required().typeError("Sale Date is required"),
  year: yup.date().required().typeError("Vehicle Year is required"),
  condition: yup.string().required().typeError("Please Select a condition"),
  brand: yup.number().required().typeError("Please Select a brand"),
  model: yup.number().required().typeError("Please Select a model"),
  color: yup.number().required().typeError("Please Select a color"),
  state: yup.number().required().typeError("Please Select a state"),
  city: yup.number().required().typeError("Please Select a city"),
})
