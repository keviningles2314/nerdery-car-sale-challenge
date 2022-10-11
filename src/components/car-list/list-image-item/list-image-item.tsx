import { Container, ImageItem, ImageLink } from "./list-image-item-styled"

interface ListImageItemProps {
  path: string
  idCar: number
}

const ListImageItem = ({ path, idCar }: ListImageItemProps) => {
  return (
    <Container>
      <ImageLink to={`/car/${idCar}`}>
        <ImageItem src={path} />
      </ImageLink>
    </Container>
  )
}

export default ListImageItem
