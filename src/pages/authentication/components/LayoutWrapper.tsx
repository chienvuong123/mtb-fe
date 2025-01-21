import React from 'react';

import './LayoutWrapper.scss';

const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="layout-auth">
      <div className="container">{children}</div>
    </div>
  );
};

export default LayoutWrapper;
