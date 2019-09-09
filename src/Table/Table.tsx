import React from 'react';
import classnames from 'classnames';

import styles from './Table.module.css';

const rows = Array.from({ length: 10 }, (_, i) => i + 1);
const columns = Array.from({ length: 30 }, (_, i) => i + 1);

export const Table: React.FC = () => (
    <table className={styles['table']}>
        <thead className={styles['table__header']}>
            <tr className={styles['table__row']}>
                {columns.map(value =>
                    <th
                        className={classnames(
                            styles['table__cell'],
                            styles['table__cell--header']
                        )}
                        key={`th.${value}`}
                    >{`Column ${value}`}</th>)}
            </tr>
        </thead>
        <tbody className={styles['table__body']}>
            {
                rows.map((row) =>
                    <tr
                        key={`row.${row}`}
                        className={styles['table__row']}
                    >
                        {columns.map(col =>
                            <td
                                key={`col.${row}.${col}`}
                                className={styles['table__cell']}
                            >
                                <input
                                    type="text"
                                    className={styles['table__input']}
                                    defaultValue={`Cell ${col}`}
                                />
                            </td>)}
                    </tr>
                )
            }
        </tbody>
    </table>
);
