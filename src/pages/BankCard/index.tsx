/* eslint-disable @typescript-eslint/ban-types */
import { currencies } from '@config/constants';
import { fetchBanks } from '@services/geoapify';
import React, { Component } from 'react';

import FilterSelect from './FilterSelect';
import MapComponent from './Map';
import { type MapState } from './types';

class BankCard extends Component<{}, MapState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      currency: '',
      data: [],
    };
  }

  async componentDidMount() {
    const points = await fetchBanks();
    if (points != null) this.setState({ data: points });
  }

  componentDidUpdate(prevProps: {}, prevState: MapState) {
    const { currency } = this.state;
    if (prevState.currency !== currency) {
      const { currency, data } = this.state;
      if (currency !== '') {
        const filteredData = data.filter(
          ({ available_currencies }: { available_currencies: string[] }) => available_currencies.includes(currency),
        );
        this.setState({ data: filteredData });
      }
    }
  }

  handleCurrencyChange = (currency: string) => {
    this.setState({ currency });
  };

  render() {
    const { data } = this.state;
    return (
      <>
        <FilterSelect values={currencies} onChange={this.handleCurrencyChange} />
        <MapComponent points={data} />
      </>
    );
  }
}

export default BankCard;
