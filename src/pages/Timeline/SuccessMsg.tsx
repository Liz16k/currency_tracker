import React, { Component } from 'react';

import S from './styled';

interface SuccessMessageProps {
  subscribe: (callback: () => void) => void
  unsubscribe: (callback: () => void) => void
}

class SuccessMessage extends Component<SuccessMessageProps> {
  constructor(props: { subscribe: () => void, unsubscribe: () => void }) {
    super(props);
    this.state = {
      successMessage: null,
    };
  }

  componentDidMount() {
    const { subscribe } = this.props;
    subscribe(this.handleThirtyCandlesBuilt);
  }

  componentWillUnmount() {
    const { unsubscribe } = this.props;
    unsubscribe(this.handleThirtyCandlesBuilt);
  }

  handleThirtyCandlesBuilt = () => {
    this.setState(({ successMessage: 'График успешно построен!' }));
    setTimeout(() => {
      this.setState(() => ({ successMessage: null }));
    }, 5000);
  };

  render() {
    const { successMessage } = this.state as { successMessage: string | null };
    return (
      <S.Message $isShow={successMessage != null ? 'true' : ''}>{successMessage ?? 'msg'}</S.Message>
    );
  }
}

export default SuccessMessage;
