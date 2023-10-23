import React, { useState } from 'react';

import {
  DropdownItem, DropdownStyle, SelectLabelInput, SelectWrapper,
} from './styled';
import { type SelectProps } from './types';

const Select: React.FC<SelectProps> = ({
  values, onChange, currentValue, onClickOption, onFocus,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (value: string) => {
    onChange(value);
    if (onClickOption !== undefined) onClickOption(value);
    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <SelectWrapper>
      <SelectLabelInput
        value={currentValue}
        onClick={handleOpen}
        onChange={handleChange}
        onFocus={onFocus}
        placeholder="choose option"
      />
      {open && (
        <DropdownStyle>
          {values.map((value) => (
            <DropdownItem
              onClick={() => {
                handleClick(value);
              }}
              $active={value === currentValue ? 'true' : ''}
              key={value}
            >
              {value}
            </DropdownItem>
          ))}
        </DropdownStyle>
      )}
    </SelectWrapper>
  );
};

export default Select;
