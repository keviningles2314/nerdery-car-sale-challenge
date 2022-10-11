import { Container } from "./header-list-styled"
import HeaderListTitle from "./header-list-title/header-list-title"

const HeaderList = () => {
  return (
    <Container>
      <HeaderListTitle title="Image" />
      <HeaderListTitle title="Lot Info" />
      <HeaderListTitle title="Vehicle Info" />
      <HeaderListTitle title="Condition" />
      <HeaderListTitle title="Sale Info" />
    </Container>
  )
}
export default HeaderList
