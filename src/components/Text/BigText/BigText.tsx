import { BigTextStyled } from './BigTextStyled';

interface BigTextProps {
  text: string;
  isBaseColor: boolean;
}
const BigText = ({ text, isBaseColor }: BigTextProps) => {
  return <BigTextStyled isBaseColor={isBaseColor}>{text}</BigTextStyled>;
};

export default BigText;
