import styled from 'styled-components';
import { theme } from './theme';

export const BaseText = styled.p`
  @import url('https://fonts.googleapis.com/css?family=Inter:400,700&display=swap');
  font-family: 'Inter', sans-serif;
  color: ${theme.primary};
  text-transform: capitalize;
`;
