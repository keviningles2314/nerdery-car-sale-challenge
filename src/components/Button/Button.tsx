import RegularText from '../Text/RegularText/RegularText';
import { StyledButton } from './ButtonStyled';

interface ButtonProps {
  title: string;
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ title, onClick, disabled = false }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      <RegularText text={title} isBaseColor={false} />
    </StyledButton>
  );
};

export default Button;
