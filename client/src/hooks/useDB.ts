import * as React from 'react';
import { DBContext } from '../context/DBProvider';

export default function useDB() {
  const context = React.useContext(DBContext);

  if (!context) throw new Error('useDB can only be used inside a DBProvider');

  return context;
}
