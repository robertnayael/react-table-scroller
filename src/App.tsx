import React from 'react';

import './App.css';
import { TableScroller } from './TableScroller/TableScroller';

const rows = Array.from({ length: 10 }, (_, i) => i + 1);
const columns = Array.from({ length: 30 }, (_, i) => i + 1);

const App: React.FC = () => {
  return (
    <div style={{ width: '50em' }}>
      <TableScroller>
        <table>
          <thead>
            <tr>
              {columns.map(value => <th key={`th.${value}`}>{value}</th>)}
            </tr>
          </thead>
          <tbody>
            {
              rows.map((row) =>
                <tr key={`row.${row}`}>
                  {columns.map(col => <td key={`col.${row}.${col}`}><input type="text" /></td>)}
                </tr>
              )
            }
          </tbody>

        </table>
      </TableScroller>
    </div>
  );
}

export default App;
