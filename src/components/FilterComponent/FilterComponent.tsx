import Button from '../Button/Button';
import EmailField from '../EmailField/EmailField';
import { Container } from './FilterComponentStyled';
import { useSearchParams } from 'react-router-dom';
import React, { SetStateAction, useState } from 'react';

interface FilterComponentProps {
  setSearchParam: Function;
}

const FilterComponent = ({ setSearchParam }: FilterComponentProps) => {
  const [textSearch, setTextSearch] = useState<string>();

  const onChangeTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextSearch(event.target.value);
  };

  const onClickHandler = () => {
    if (textSearch) {
      setSearchParam({ search: textSearch! });
    } else {
      setSearchParam({ search: '' });
    }
  };
  return (
    <>
      <Container>
        <EmailField
          onChangeText={onChangeTextHandler}
          placeholder={'Search by VIN, Title or Batch No'}
        />
        <Button title='Search' onClick={onClickHandler} />
      </Container>
    </>
  );
};
export default FilterComponent;
