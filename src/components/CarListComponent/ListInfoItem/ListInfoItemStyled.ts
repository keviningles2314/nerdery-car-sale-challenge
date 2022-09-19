import styled from 'styled-components';
import { Star as RegularStar } from '@styled-icons/fa-regular/Star';
import { Star as SolidStar } from '@styled-icons/fa-solid/Star';
import { theme } from '../../../style/theme';

export const Container = styled.div`
  width: 20%;
  margin-left: 4%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const StarRegular = styled(RegularStar)`
  width: 20px;
  height: 20px;
  color: ${theme.lightBlue};
  cursor: pointer;
`;

export const StarSolid = styled(SolidStar)`
  width: 20px;
  height: 20px;
  color: ${theme.lightBlue};
  cursor: pointer;
`;

export const FavoriteButton = styled.div`
  border: none;
  background: none;
  width: 20px;
`;
