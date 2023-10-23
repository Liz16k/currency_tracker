const baseTheme = {
  sizes: {
    font: {
      label: '1.25rem',
      body: '1.5rem',
      title: '4.75rem',
      headline: '5.65rem',
    },
  },
  symbolFont: '\'Chakra Petch\', sans-serif',
  gradient: { first: '#030304', second: '#184F2840', third: '#030304' },
};

const lightTheme = {
  colors: {
    bg: '#FFFFFF',
    cardBg: '#fff',
    cardBorder: '#474747',
    primaryText: '#030304',
    secondaryText: '#D9D9D9',
    tertiaryText: '#474747',
    accentText: '#A7B2C3',
    quoteText: '#474747',
  },
  sizes: {
    ...baseTheme.sizes,
    borderWidth: '0.05rem',
  },
  transform: 'translateX(-1.25rem)',
};
const darkTheme = {
  colors: {
    bg: '#030304',
    cardBg: '#202025',
    cardBorder: '#474747',
    primaryText: '#FFFFFF',
    secondaryText: '#D9D9D9',
    tertiaryText: '#898989',
    accentText: '#A7B2C3',
    quoteText: '#FFFFFF',
    gradient: baseTheme.gradient,
  },
  sizes: {
    ...baseTheme.sizes,
    borderWidth: '0.125rem',
  },
  transform: 'translateX(0px)',
};

export { darkTheme, lightTheme };
