export const getColumnPositions = (table: HTMLTableElement) =>
    [ ...table.querySelectorAll('th') ]
        .map(th => th.getBoundingClientRect().left - table.getBoundingClientRect().left)
        .map((column, _, [ firstColumn ]) => column - firstColumn);
