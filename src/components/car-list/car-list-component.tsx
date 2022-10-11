import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import {
  OrderBy,
  useQueryGetCarsQuery,
} from "../../api/graphql/__generated__/graphql-types"
import { isValidUuid } from "../../helpers/validators"
import ErrorMessage from "../error-message/error-message"
import FilterComponent from "../filter/filter-component"
import HeaderList from "../header-list/header-list"
import LoadingComponent from "../loading/loading"
import BodyList from "./body-list/body-list"
import { Container } from "./car-list-styled"

interface UserCars {
  userId: number
  carId: number
}

interface CarListProps {
  favoritesCars?: UserCars[]
}

const CarListComponent = ({ favoritesCars }: CarListProps) => {
  const { data, loading, error, refetch } = useQueryGetCarsQuery()
  const [searchParameter, setSearchParameter] = useSearchParams()

  const search = searchParameter.get("search")
  const order = searchParameter.get("order")

  const orderParameter = order === "asc" ? OrderBy.Asc : OrderBy.Desc

  useEffect(() => {
    if (search && !loading) {
      if (isValidUuid(search)) {
        refetch({
          orderBy: [
            {
              saleDate: orderParameter,
            },
          ],
          where: {
            _and: [
              {
                batch: {
                  _eq: search,
                },
              },
              {
                id: {
                  _in:
                    favoritesCars && favoritesCars.map((carId) => carId.carId),
                },
              },
            ],
          },
        })
      } else {
        refetch({
          orderBy: [
            {
              saleDate: orderParameter,
            },
          ],
          where: {
            _or: [
              {
                title: {
                  _iregex: search ?? "",
                },
              },
              {
                vin: {
                  _iregex: search ?? "",
                },
              },
            ],
            id: {
              _in: favoritesCars && favoritesCars.map((carId) => carId.carId),
            },
          },
        })
      }
    }
  }, [search, order, favoritesCars, loading, data, orderParameter, refetch])

  if (loading) {
    return <LoadingComponent />
  }

  if (error) {
    return <ErrorMessage message={error.message} />
  }

  if (data && data.cars.length === 0) {
    return <ErrorMessage message="No data Found" />
  }

  return (
    <Container>
      <FilterComponent setSearchParam={setSearchParameter} />
      <HeaderList />
      {data ? <BodyList carsInfo={data.cars} /> : null}
    </Container>
  )
}

export default CarListComponent
