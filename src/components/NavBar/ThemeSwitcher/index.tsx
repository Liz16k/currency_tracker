import React, { useContext } from 'react';

import { ThemeContext } from '../../../Contexts';
import S from './styled';

const ThemeSwitcher = () => {
  const { theme, switchTheme } = useContext(ThemeContext);
  const handleSwitch = () => {
    switchTheme();
  };
  return (
    <S.SwitchWrapper>
      <S.SwitchInput onChange={handleSwitch} checked={theme === 'light'} />
      <S.SwitchSlider data-testid="switcher" />
    </S.SwitchWrapper>
  );
};

export default ThemeSwitcher;
