import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding: 8px;
`;

export const ImageItem = styled.img`
  min-width: 90%;
  min-height: 90%;
`;

export const ImageLink = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
`;
