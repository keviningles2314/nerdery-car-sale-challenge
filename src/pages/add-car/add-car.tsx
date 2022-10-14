import AddCarComponent from "../../components/add-car/add-car"
import HeadingTitle from "../../components/text/heading-title/heading-title"
import { Container, LineSeparator } from "./add-car-styled"

const AddCar = () => {
  return (
    <Container>
      <HeadingTitle text="Add a Car" isBaseColor />
      <LineSeparator />
      <AddCarComponent />
    </Container>
  )
}
export default AddCar
