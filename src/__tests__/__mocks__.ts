const pages = ['Home', 'Timeline', 'Bank Card', 'Contacts'];

const fakeLightTheme = {
  colors: {
    bg: '#F0F0F0',
    cardBg: '#fff',
    cardBorder: '#555555',
    primaryText: '#000000',
    secondaryText: '#999999',
    tertiaryText: '#555555',
    accentText: '#CCCCCC',
    quoteText: '#555555',
    gradient: { first: '#F0F0F0', second: '#555555', third: '#000000' },
  },
  sizes: {
    font: {
      label: '1rem',
      body: '1rem',
      title: '5rem',
      headline: '5rem',
    },
    borderWidth: '0.05rem',
  },
  transform: 'translateX(-1rem)',
};
const fakeContextValue = {
  theme: fakeLightTheme,
  switchTheme: () => {},
};

export { fakeContextValue, fakeLightTheme, pages };
