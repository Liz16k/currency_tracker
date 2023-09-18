import { createContext } from 'react';

interface ThemeContextType {
  theme: string
  switchTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'dark', switchTheme: () => {} });

export default ThemeContext;
