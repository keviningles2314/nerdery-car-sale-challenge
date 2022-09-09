import styled from 'styled-components';
import { theme } from '../../style/theme';

export const Container = styled.div`
  background-color: ${theme.blue};
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 10px;
  gap: 10px;
  box-sizing: border-box;
`;
