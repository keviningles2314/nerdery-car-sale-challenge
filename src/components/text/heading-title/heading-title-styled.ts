import styled from "styled-components"
import { BaseText } from "../../../style/base-text"
import { theme } from "../../../style/theme"

interface TextProps {
  isBaseColor: boolean
}

export const HeadingTitleStyled = styled(BaseText)`
  color: ${(props: TextProps) =>
    props.isBaseColor ? theme.primary : theme.secondary};
  font-size: ${theme.big};
`
