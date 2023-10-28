import React, { type ChangeEvent, type FC, useState } from 'react';

import S from './styled';
import { type SelectProps } from './types';

const Select: FC<SelectProps> = ({
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <S.SelectWrapper>
      <S.SelectLabelInput
        value={currentValue}
        onClick={handleOpen}
        onChange={handleChange}
        onFocus={onFocus}
        placeholder="choose option"
      />
      {open && (
        <S.DropdownStyle>
          {values.map((value) => (
            <S.DropdownItem
              onClick={() => {
                handleClick(value);
              }}
              $active={value === currentValue ? 'true' : ''}
              key={value}
            >
              {value}
            </S.DropdownItem>
          ))}
        </S.DropdownStyle>
      )}
    </S.SelectWrapper>
  );
};

export default Select;
