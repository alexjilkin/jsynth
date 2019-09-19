import React from 'react'

const logger = {
  error: (message, err) => console.error(message)
}

export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        hasError: false
      }
    }
    
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      logger.error(error, errorInfo);
    }
  
  render() {
    const {Fallback, children} = this.props
    const {hasError} = this.state;

    if (hasError) {
      return Fallback ? <Fallback /> : <div> Something went wrong </div>;
    }

    return children; 
  }
}