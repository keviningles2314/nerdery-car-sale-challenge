import styled from 'styled-components';
import { Select, Option } from '../SelectOption/SelectOptionStyled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const NestedElements = styled.div`
  display: flex;
  gap: 10px;
`;

export const SectionNestedElement = styled(NestedElements)`
  flex-direction: column;
  width: 100%;
`;

export const SelectOption = styled(Select)``;

export const OptionElement = styled(Option)``;

export const InputElementField = styled.input``;

export const ConditionContainer = styled.div`
  display: flex;
  gap: 40px;
  width: 50%;
`;

export const LabelCondition = styled.label`
  display: flex;
  gap: 10px;
`;
