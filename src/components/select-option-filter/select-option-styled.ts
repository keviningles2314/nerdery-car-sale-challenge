import styled from 'styled-components';
import { theme } from '../../style/theme';

export const Select = styled.select`
  border: none;
  padding-left: 10px;
  background-color: ${theme.secondary};
  width: 50%;
  cursor: pointer;
  font-size: 0.8rem;
`;

export const Option = styled.option`
  appearance: none;
  padding: 20px;
`;
