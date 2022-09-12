import { Container, ErrorParagraph } from './ErrorMessageStyled';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <Container>
      <ErrorParagraph>Error : {message}</ErrorParagraph>
    </Container>
  );
};

export default ErrorMessage;
