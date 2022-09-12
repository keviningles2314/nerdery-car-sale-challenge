import path from 'node:path/win32';
import { Container, ImageItem } from './ListImageItemStyled';

interface ListImageItemProps {
  path: string;
}

const ListImageItem = ({ path }: ListImageItemProps) => {
  return (
    <Container>
      <ImageItem src={path} />
    </Container>
  );
};

export default ListImageItem;
