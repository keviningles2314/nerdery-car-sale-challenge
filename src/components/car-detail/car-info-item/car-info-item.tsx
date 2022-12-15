import RegularText from "../../text/regular-text/regular-text"
import { Container } from "../car-detail-styled"

interface CarInfoItemProps {
  title: string
  element: string | number | Date
}

const CarInfoItem = ({ title, element }: CarInfoItemProps) => {
  return (
    <Container>
      <RegularText text={`${title} :`} isBaseColor isBold />
      <RegularText text={`${element ?? "No info"}`} isBaseColor />
    </Container>
  )
}
export default CarInfoItem
