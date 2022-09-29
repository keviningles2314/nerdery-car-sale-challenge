import styled from 'styled-components';
import { BaseText } from '../../style/baseText';
import { theme } from '../../style/theme';

interface ButtonStyledProps {
  disabled: boolean;
}

export const ButtonStyled = styled.button`
  background-color: ${(props: ButtonStyledProps) =>
    props.disabled ? theme.gray : theme.yellow};
  border: none;
  border-radius: ${theme.rounded};
  cursor: ${(props: ButtonStyledProps) =>
    props.disabled ? 'not-allowed' : 'pointer'};
`;
