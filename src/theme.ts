const baseTheme = {
  sizes: {
    font: {
      label: '1.25rem',
      body: '1.5rem',
      title: '1.75rem',
      headline: '2rem',
    },
  },
};

const lightTheme = {};
const darkTheme = {
  colors: {
    bg: '#030304',
    cardBg: '#474747',
    primaryText: '#FFFFFF',
    secondaryText: '#D9D9D9',
    tertiaryText: '#898989',
    accentText: '#A7B2C3',
    gradient: { green: '#00CE2C', lightGreen: '#AEDF23', yellow: '#A3DC00' },
  },
  sizes: {
    ...baseTheme.sizes,
  },
};

export { darkTheme, lightTheme };
