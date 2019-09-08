export const getBoundingRect = (element: HTMLElement) => {
    if (element instanceof HTMLElement) {
        const { width, height, top, left, bottom, right } = element.getBoundingClientRect();
        return { width, height, top, left, bottom, right };
    }
    return null;
};
