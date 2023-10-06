/* eslint-disable max-len */
import React, { useState } from 'react';

import Select from '../../components/Select';

const FilterSelect = ({
  onChange,
  values,
}: {
  onChange: (value: string) => void
  values: string[]
}) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState(values);

  const updateSuggestions = () => {
    const filteredSuggestions = values.filter((hint: string) => hint.toLowerCase().includes(inputValue.toLowerCase()));
    setSuggestions(() => filteredSuggestions);
  };

  // TODO: fix elastic search

  const handleChange = (value: string) => {
    setInputValue(value);
    updateSuggestions();
  };

  const handleClickOption = (value: string) => {
    onChange(value);
    setInputValue(value);
    setSuggestions([]);
  };

  const handleFocus = () => {
    setInputValue('');
    updateSuggestions();
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
