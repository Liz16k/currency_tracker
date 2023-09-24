import React, { useState } from 'react';

import S from './styled';

const Select = ({
  values,
  onChange,
  currentValue,
}: {
  values: string[]
  onChange: (value: string) => void
  currentValue: string
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (value: string) => {
    onChange(value);
    handleClose();
  };

  return (
    <S.SelectWrapper>
      <S.SelectLabelButton onClick={handleOpen}>
        {currentValue === '' ? 'select' : currentValue}
      </S.SelectLabelButton>
      {open && (
        <S.DropdownStyle>
          {values.map((value) => (
            <S.DropdownItem
              onClick={() => {
                handleChange(value);
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
