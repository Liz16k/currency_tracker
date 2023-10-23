/* eslint-disable react/destructuring-assignment */
import { ERRORS_MSG } from '@utils/constants';
import React, { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode
  // eslint-disable-next-line react/require-default-props
  fallbackUI?: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(ERRORS_MSG.boundary, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      return this.props.fallbackUI ?? <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
