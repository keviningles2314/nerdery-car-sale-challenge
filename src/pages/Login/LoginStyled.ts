import styled from 'styled-components';
import { theme } from '../../style/theme';

export const ParentContainer = styled.div`
  background-color: ${theme.blue};
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const Container = styled(ParentContainer)`
  width: 40%;
  display: flex;
  flex-direction: column;
  text-align: center;
  box-sizing: border-box;
`;
