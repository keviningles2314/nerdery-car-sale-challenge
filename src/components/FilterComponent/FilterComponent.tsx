import Button from '../Button/Button';
import EmailField from '../TextField/TextField';
import { Container } from './FilterComponentStyled';
import React, { useState } from 'react';
import SelectOption from '../SelectOption/SelectOption';
import RegularText from '../Text/RegularText/RegularText';

interface FilterComponentProps {
  setSearchParam: Function;
}

const FilterComponent = ({ setSearchParam }: FilterComponentProps) => {
  const [textSearch, setTextSearch] = useState<string>();
  const [orderOption, setOrderOption] = useState<string>();

  const onChangeTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextSearch(event.target.value);
  };

  const OnChangeOptionHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setOrderOption(event.target.value);
  };

  const onClickHandler = () => {
    if (textSearch) {
      setSearchParam({
        search: textSearch!,
        order: orderOption ? orderOption : 'desc',
      });
    } else {
      setSearchParam({ search: '', order: orderOption ? orderOption : 'desc' });
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
        <RegularText text='Order By Sale Date: ' isBaseColor />
        <SelectOption
          optionArray={[
            { value: 'desc', text: 'Descending' },
            { value: 'asc', text: 'Ascending' },
          ]}
          onChangeOption={OnChangeOptionHandler}
        />
      </Container>
    </>
  );
};

export default FilterComponent;
