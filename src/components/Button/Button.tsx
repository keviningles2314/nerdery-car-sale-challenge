import RegularText from '../Text/RegularText/RegularText';
import { ButtonStyled } from './ButtonStyled';

interface ButtonProps {
  title: string;
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ title, onClick, disabled = false }: ButtonProps) => {
  return (
    <ButtonStyled onClick={onClick} disabled={disabled} data-testid='button'>
      <RegularText text={title} isBaseColor={false} />
    </ButtonStyled>
  );
};

export default Button;
