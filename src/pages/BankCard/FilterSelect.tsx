import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    // eslint-disable-next-line max-len
    const filteredSuggestions = values.filter((hint: string) => hint.toLowerCase().includes(inputValue.toLowerCase()));
    setSuggestions(filteredSuggestions);
  }, [inputValue, values]);

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
