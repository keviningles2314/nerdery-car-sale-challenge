import styled from 'styled-components';
import { BaseText } from '../../../style/baseText';
import { theme } from '../../../style/theme';

interface TextProps {
  isBaseColor: boolean;
}

export const HeadingTitleStyled = styled(BaseText)`
  color: ${(props: TextProps) =>
    props.isBaseColor ? theme.black : theme.white};
  font-size: ${theme.big};
`;
