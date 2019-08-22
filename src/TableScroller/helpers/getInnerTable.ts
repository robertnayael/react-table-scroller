export const getInnerTable = (element: HTMLElement) => {
    const table = element.querySelector('table');
    if (table instanceof HTMLTableElement) {
        return table;
    }
    return null;
};
