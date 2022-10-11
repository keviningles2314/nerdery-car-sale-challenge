import { HeadingTitleStyled } from "./heading-title-styled"

interface HeadingTitleProps {
  text: string
  isBaseColor: boolean
}

const HeadingTitle = ({ text, isBaseColor }: HeadingTitleProps) => {
  return (
    <HeadingTitleStyled isBaseColor={isBaseColor}>{text}</HeadingTitleStyled>
  )
}

export default HeadingTitle
