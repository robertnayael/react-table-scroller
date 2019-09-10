import React from 'react';

import { Table } from './Table';
import { TableScroller } from './TableScroller/TableScroller';

import styles from './App.module.css';

const App: React.FC = () => {
  return (
    <div className={styles['app-container']}>
      <TableScroller>
        <Table />
      </TableScroller>
    </div>
  );
}

export default App;
