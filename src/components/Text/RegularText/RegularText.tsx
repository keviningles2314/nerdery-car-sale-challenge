import { RegularTextStyled } from './RegularTextStyled';

interface RegularTextProps {
  text: string;
  isBaseColor: boolean;
}

const RegularText = ({ text, isBaseColor }: RegularTextProps) => {
  return (
    <RegularTextStyled isBaseColor={isBaseColor}>{text}</RegularTextStyled>
  );
};

export default RegularText;
