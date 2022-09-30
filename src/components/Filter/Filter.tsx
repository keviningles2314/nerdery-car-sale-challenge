import EmailField from '../TextField/TextField';
import { Container } from './FilterStyled';
import React, { useCallback, useEffect, useState } from 'react';
import RegularText from '../Text/RegularText/RegularText';
import SelectOptionFilter from '../SelectOptionFilter/SelectOption';
import debounce from 'lodash/debounce';

interface FilterProps {
  setSearchParam: Function;
}

const FilterComponent = ({ setSearchParam }: FilterProps) => {
  const [textSearch, setTextSearch] = useState<string>();
  const [orderOption, setOrderOption] = useState<string>();

  const onChangeTextHandler = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTextSearch(event.target.value);
    },
    800
  );

  const onChangeOptionHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setOrderOption(event.target.value);
  };

  useEffect(() => {
    setSearchParam({
      search: textSearch ? textSearch : '',
      order: orderOption ? orderOption : 'desc',
    });
  }, [orderOption, textSearch]);

  return (
    <>
      <Container>
        <EmailField
          onChangeText={onChangeTextHandler}
          placeholder={'Search by VIN, Title or Batch No'}
        />
        <RegularText text='Order By Sale Date: ' isBaseColor />
        <SelectOptionFilter
          optionArray={[
            { value: 'desc', text: 'Descending' },
            { value: 'asc', text: 'Ascending' },
          ]}
          onChangeOption={onChangeOptionHandler}
        />
      </Container>
    </>
  );
};

export default FilterComponent;
