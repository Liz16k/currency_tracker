import React, { useState } from 'react';

import S from './styled';

const Select = ({ label, values }: { label: string, values: string[] }) => {
  const [currentValue, setCurrentValue] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeValue = (value: string): void => {
    setCurrentValue(value);
  };
  const handleChange = (value: string) => {
    handleChangeValue(value);
    handleClose();
  };

  return (
    <S.SelectWrapper>
      <S.SelectLabelButton onClick={handleOpen}>
        {currentValue === '' ? label : currentValue}
      </S.SelectLabelButton>
      {open && (
        <S.DropdownStyle>
          {values.map((value) => (
            <S.DropdownItem
              onClick={() => {
                handleChange(value);
              }}
              active={value === currentValue}
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
