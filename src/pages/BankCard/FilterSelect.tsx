import Select from '@components/Select';
import React, { useDeferredValue, useEffect, useState } from 'react';

import type { FilterSelectProps } from './types';

const FilterSelect = ({
  onChange,
  values,
}: FilterSelectProps) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState(values);

  const deferredInputValue = useDeferredValue(inputValue);

  useEffect(() => {
    const filteredSuggestions = values.filter((hint: string) => hint.toLowerCase().includes(deferredInputValue.toLowerCase()));
    setSuggestions(filteredSuggestions);
  }, [deferredInputValue, values]);

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  const handleClickOption = (value: string) => {
    onChange(value);
    setInputValue(value);
    setSuggestions([]);
  };

  const handleFocus = () => {
    setInputValue('');
  };

  return (
    <Select
      values={suggestions}
      currentValue={inputValue}
      onChange={handleChange}
      onClickOption={handleClickOption}
      onFocus={handleFocus}
    />
  );
};

export default FilterSelect;
