import styled from 'styled-components';
import { BaseText } from '../../style/baseText';
import { theme } from '../../style/theme';

export const Container = styled.div`
  width: 50%;
  text-align: center;
`;

export const ErrorParagraph = styled(BaseText)`
  color: ${theme.red};
`;
