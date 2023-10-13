import React, { memo, useContext } from 'react';
import { Chart } from 'react-google-charts';

import { ThemeContext } from '../../utils/Contexts';

const CandlestickChart = ({ data }: any) => {
  const { theme } = useContext(ThemeContext);
  const mainColor = theme === 'dark' ? '#FFFFFF' : '#030304';
  const titleStyle = {
    color: mainColor,
    italic: false,
    fontName: 'Poppins',
  };
  const options = {
    backgroundColor: theme === 'light' ? '#FFFFFF' : '#030304',
    legend: 'none',
    candlestick: {
      fallingColor: { strokeWidth: 0, fill: '#f2373d' },
      risingColor: { strokeWidth: 0, fill: '#22c949' },
    },
    hAxis: {
      title: 'Date',
      titleTextStyle: titleStyle,
    },
    vAxis: {
      title: 'Value',
      titleTextStyle: titleStyle,
    },
    colors: [theme === 'dark' ? '#ffffff' : '#898989'],
  };

  return (
    <Chart
      chartType="CandlestickChart"
      height="25rem"
      data={[['day', 'l', 'o', 'c', 'h'], ...data]}
      options={options}
    />
  );
};

export default memo(CandlestickChart);
