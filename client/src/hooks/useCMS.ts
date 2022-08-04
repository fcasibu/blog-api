import * as React from 'react';
import { CMSContext } from '../context/CMSProvider';

export default function useCMS() {
  const context = React.useContext(CMSContext);

  if (!context) throw new Error('useCMS can only be used inside a CMSProvider');

  return context;
}
