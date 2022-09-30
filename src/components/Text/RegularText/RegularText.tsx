import { RegularTextStyled } from './RegularTextStyled';

interface RegularTextProps {
  text: string;
  isBaseColor: boolean;
  isBold?: boolean;
}

const RegularText = ({
  text,
  isBaseColor,
  isBold = false,
}: RegularTextProps) => {
  return (
    <RegularTextStyled isBaseColor={isBaseColor} isBold={isBold}>
      {text}
    </RegularTextStyled>
  );
};

export default RegularText;
