import Button from '../Button/Button';
import EmailField from '../TextField/TextField';
import { Container } from './FilterComponentStyled';
import React, { useState } from 'react';
import SelectOption from '../SelectOptionFilter/SelectOption';
import RegularText from '../Text/RegularText/RegularText';
import SelectOptionFilter from '../SelectOptionFilter/SelectOption';

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
    setSearchParam({
      search: textSearch ? textSearch : '',
      order: event.target.value,
    });
  };

  const onClickHandler = () => {
    if (textSearch) {
      setSearchParam({
        search: textSearch!,
      });
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
        <RegularText text='Order By Sale Date: ' isBaseColor />
        <SelectOptionFilter
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
