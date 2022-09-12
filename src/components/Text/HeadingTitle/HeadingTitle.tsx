import { HeadingTitleStyled } from './HeadingTitleStyled';

interface HeadingTitleProps {
  text: string;
  isBaseColor: boolean;
}

const HeadingTitle = ({ text, isBaseColor }: HeadingTitleProps) => {
  return (
    <HeadingTitleStyled isBaseColor={isBaseColor}>{text}</HeadingTitleStyled>
  );
};

export default HeadingTitle;
