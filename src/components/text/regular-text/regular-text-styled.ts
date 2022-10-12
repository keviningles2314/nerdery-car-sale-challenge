import styled from "styled-components"
import { BaseText } from "../../../style/base-text"
import { theme } from "../../../style/theme"

interface TextProps {
  isBaseColor: boolean
  isBold: boolean
}

export const RegularTextStyled = styled(BaseText)`
  color: ${(props: TextProps) =>
    props.isBaseColor ? theme.primary : theme.secondary};
  font-size: ${theme.regular};
  font-weight: ${(props: TextProps) => (props.isBold ? "bold" : "regular")};
`
