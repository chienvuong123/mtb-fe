import { Button } from 'antd';
import React from 'react';

interface IErrorFallbackProps {
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<IErrorFallbackProps> = ({
  resetErrorBoundary,
}) => (
  <div>
    There was an error!
    <Button onClick={() => resetErrorBoundary()}>Try again</Button>
  </div>
);

export default ErrorFallback;
