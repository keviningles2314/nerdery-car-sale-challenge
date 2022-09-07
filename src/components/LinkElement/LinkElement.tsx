import RegularText from '../Text/RegularText/RegularText';
import { LinkElementStyled } from './LinkElementStyled';

interface LinkElementProps {
  path: string;
  text: string;
}

const LinkElement = ({ path, text }: LinkElementProps) => {
  return (
    <LinkElementStyled to={path}>
      <RegularText text={text} isBaseColor={false} />
    </LinkElementStyled>
  );
};

export default LinkElement;
