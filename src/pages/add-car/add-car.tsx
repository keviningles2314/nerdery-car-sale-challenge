import AddCarForm from "../../components/add-car-form/add-car-form"
import HeadingTitle from "../../components/text/heading-title/heading-title"
import { Container, LineSeparator } from "./add-car-styled"

const AddCar = () => {
  return (
    <Container>
      <HeadingTitle text="Add a Car" isBaseColor />
      <LineSeparator />
      <AddCarForm />
    </Container>
  )
}
export default AddCar
