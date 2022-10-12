import { Container, ErrorParagraph } from "./error-message-styled"

interface ErrorMessageProps {
  message: string
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <Container>
      <ErrorParagraph>Error : {message}</ErrorParagraph>
    </Container>
  )
}

export default ErrorMessage
