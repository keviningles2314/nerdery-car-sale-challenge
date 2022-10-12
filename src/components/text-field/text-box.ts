import styled from "styled-components"
import { theme } from "../../style/theme"

export const TextBox = styled.input`
  color: ${theme.primary};
  background-color: ${theme.colorTextField};
  border-radius: ${theme.rounded};
  border: none;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;

  ::placeholder {
    text-transform: capitalize;
  }
`
