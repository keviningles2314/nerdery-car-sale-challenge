import { Cars } from "../../../api/graphql/__generated__/graphql-types"
import ListImageItem from "../list-image-item/list-image-item"
import ListInfoItem from "../list-info-item/list-info-item"
import { Container, Section } from "./body-list-styled"
import { defaultImagePath } from "../../../helpers/objectValues"

interface BodyListProps {
  carsInfo: Cars[]
}

const BodyList = ({ carsInfo }: BodyListProps) => {
  return (
    <Container>
      {carsInfo.map((carInfo) => {
        return (
          <Section key={carInfo.batch}>
            <ListImageItem path={defaultImagePath} idCar={carInfo.id} />

            <ListInfoItem
              title="Title:"
              primaryInfo={`${carInfo.year} ${carInfo.model.brand.name} ${carInfo.model.name}`}
              complementaryTitle="Batch:"
              complementaryInfo={carInfo.batch}
            />
            <ListInfoItem
              title="Odometer:"
              primaryInfo={carInfo.odometer ?? "No info"}
              complementaryTitle="Price:"
              complementaryInfo={carInfo.price}
            />
            <ListInfoItem
              title="Vehicle Condition:"
              primaryInfo={carInfo.condition === "A" ? "Salvage Title" : "New"}
              carId={carInfo.id}
            />
            <ListInfoItem
              title="Location:"
              primaryInfo={`${carInfo.city.state.name} - ${carInfo.city.name}`}
              complementaryTitle="Sale Date:"
              complementaryInfo={carInfo.saleDate}
            />
          </Section>
        )
      })}
    </Container>
  )
}

export default BodyList
