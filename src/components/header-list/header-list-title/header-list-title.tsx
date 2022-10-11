import RegularText from "../../text/regular-text/regular-text"
import { Container } from "./header-list-title-styled"

interface HeaderListTitleProps {
  title: string
}

const HeaderListTitle = ({ title }: HeaderListTitleProps) => {
  return (
    <Container>
      <RegularText isBaseColor={false} text={title} />
    </Container>
  )
}

export default HeaderListTitle
