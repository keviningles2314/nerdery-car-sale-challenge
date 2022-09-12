import RegularText from '../Text/RegularText/RegularText';
import { Container } from './ErrorMessageStyled';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <Container>
      <RegularText text={`Error: ${message}`} isBaseColor={false} />
    </Container>
  );
};

export default ErrorMessage;
