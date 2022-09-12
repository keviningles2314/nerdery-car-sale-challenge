import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

export const NestedElements = styled.div`
  display: flex;
  gap: 5px;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SectionNestedElement = styled(NestedElements)`
  flex-direction: column;
  width: 100%;
`;
