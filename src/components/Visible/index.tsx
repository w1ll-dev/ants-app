import React from 'react';
import { ViewProps } from 'react-native';

interface VisibleProps extends ViewProps {
  visible: boolean;
}

function Visible({ visible, children }: VisibleProps) {
  if (!visible) return null;

  return <>{children}</>;
}

export default Visible;
