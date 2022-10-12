import RegularText from "../text/regular-text/regular-text"
import { LinkElementStyled } from "./link-element-styled"

interface LinkElementProps {
  path: string
  text: string
}

const LinkElement = ({ path, text }: LinkElementProps) => {
  return (
    <LinkElementStyled to={path}>
      <RegularText text={text} isBaseColor={false} />
    </LinkElementStyled>
  )
}

export default LinkElement
