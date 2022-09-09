import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Section = styled(Container)`
  width: 100%;
  flex-direction: row;
  box-shadow: 1px 2px 4px #888888;
`;
