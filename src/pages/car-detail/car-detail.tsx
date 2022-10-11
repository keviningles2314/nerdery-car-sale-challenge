import { useParams } from "react-router-dom"
import { useQueryGetCarsQuery } from "../../api/graphql/__generated__/graphql-types"
import CarDetailComponent from "../../components/car-detail/car-detail-component"
import ErrorMessage from "../../components/error-message/error-message"
import LoadingComponent from "../../components/loading/loading"
import { Container } from "./car-detail-styled"

const CarDetail = () => {
  const { idCar } = useParams()
  const { data, loading, error } = useQueryGetCarsQuery({
    variables: {
      where: {
        id: {
          _eq: Number(idCar),
        },
      },
    },
  })

  if (loading) <LoadingComponent />

  if (error) <ErrorMessage message={error.message} />

  return (
    <Container>
      {data ? <CarDetailComponent carInfo={data.cars[0]} /> : null}
    </Container>
  )
}
export default CarDetail
