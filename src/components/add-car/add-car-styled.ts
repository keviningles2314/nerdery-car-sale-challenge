import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding-bottom: 60px;
`

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const NestedElements = styled.div`
  display: flex;
  gap: 10px;
`

export const SectionNestedElement = styled(NestedElements)`
  flex-direction: column;
  justify-content: center;
  width: 100%;
`
