import styled from 'styled-components';
import { BaseText } from '../../style/baseText';
import { theme } from '../../style/theme';
interface StyledButtonProps {
  disabled: boolean;
}
export const StyledButton = styled.button`
  background-color: ${(props: StyledButtonProps) =>
    props.disabled ? theme.gray : theme.yellow};
  border: none;
  border-radius: ${theme.rounded};
  cursor: ${(props: StyledButtonProps) =>
    props.disabled ? 'not-allowed' : 'pointer'};
`;
