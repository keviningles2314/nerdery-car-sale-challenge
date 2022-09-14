import { useEffect, useState } from 'react';
import RegularText from '../Text/RegularText/RegularText';
import { Container } from './SuccessCreationMessageStyled';

const SuccessCreationMessage = () => {
  const [isShow, setIsShow] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setIsShow(false);
    }, 3000);
  }, []);
  return (
    <>
      {isShow && (
        <Container>
          <RegularText text='Creation Complete' isBaseColor={false} />
        </Container>
      )}
    </>
  );
};
export default SuccessCreationMessage;
