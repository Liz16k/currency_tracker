import React, {
  createContext, type ReactNode, useMemo, useState,
} from 'react';

interface ThemeContextType {
  theme: string
  switchTheme: () => void
}

interface LastUpdateContextType {
  lastUpdate: string
  setLastUpdate: React.Dispatch<React.SetStateAction<string>>
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'dark', switchTheme: () => {} });

const LastUpdateContext = createContext<LastUpdateContextType>({
  lastUpdate: '',
  setLastUpdate: () => {},
});

export const LastUpdateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const contextValue = useMemo(() => ({ lastUpdate, setLastUpdate }), [lastUpdate]);

  return (
    <LastUpdateContext.Provider value={contextValue}>
      {children}
    </LastUpdateContext.Provider>
  );
};

export { LastUpdateContext, type LastUpdateContextType, ThemeContext };
