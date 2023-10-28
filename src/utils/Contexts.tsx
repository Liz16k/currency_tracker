import React, {
  createContext, type Dispatch,
  type FC,
  type ReactNode, type SetStateAction,
  useMemo, useState,
} from 'react';

export interface ThemeContextType {
  theme: string
  switchTheme: () => void
}

interface LastUpdateContextType {
  lastUpdate: string
  setLastUpdate: Dispatch<SetStateAction<string>>
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'dark', switchTheme: () => {} });

const LastUpdateContext = createContext<LastUpdateContextType>({
  lastUpdate: '',
  setLastUpdate: () => {},
});

export const LastUpdateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const contextValue = useMemo(() => ({ lastUpdate, setLastUpdate }), [lastUpdate]);

  return (
    <LastUpdateContext.Provider value={contextValue}>
      {children}
    </LastUpdateContext.Provider>
  );
};

export { LastUpdateContext, type LastUpdateContextType, ThemeContext };
