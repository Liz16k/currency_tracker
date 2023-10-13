/* eslint-disable @typescript-eslint/ban-types */
import React, { Component } from 'react';

import { fetchBanks } from '../../services/geoapify';
import { currencies } from '../../utils/constants';
import { LastUpdateContext, type LastUpdateContextType } from '../../utils/Contexts';
import FilterSelect from './FilterSelect';
import MapComponent from './Map';
import { type MapState } from './types';

class BankCard extends Component<{}, MapState> {
  constructor(props: any) {
    super(props);
    this.state = {
      currency: '',
      data: [],
    };
  }

  async componentDidMount() {
    try {
      const points = await fetchBanks();
      this.setState({ data: points });
    } catch (error) {
      console.error(error);
    }
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
    this.setLastUpdate();
  }

  setLastUpdate = () => {
    const { setLastUpdate } = this.context as LastUpdateContextType;
    setLastUpdate((new Date()).toLocaleTimeString('it-IT'));
  };

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
BankCard.contextType = LastUpdateContext;

export default BankCard;
