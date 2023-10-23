import { ThemeContext } from '@utils/Contexts';
import React, { useContext } from 'react';

import { SwitchInput, SwitchSlider, SwitchWrapper } from './styled';

const ThemeSwitcher = () => {
  const { theme, switchTheme } = useContext(ThemeContext);
  const handleSwitch = () => {
    switchTheme();
  };
  return (
    <SwitchWrapper>
      <SwitchInput onChange={handleSwitch} checked={theme === 'light'} />
      <SwitchSlider data-testid="switcher" />
    </SwitchWrapper>
  );
};

export default ThemeSwitcher;
