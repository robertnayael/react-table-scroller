import { TableScrollerState } from '../models';

export const initialState: TableScrollerState = {
    position: 0,
    scrollOffset: 0,
    visibleContentPercentage: 0,
    isScrolling: false,
    columns: 0,
    elements: {
        mainWrapper: null,
        contentWrapper: null,
        scrollbar: null,
    },
    rects: {
        mainWrapper: null,
        contentWrapper: null,
        scrollbar: null,
    },
    startPosition: {
        absolute: null,
        relativeToHandler: null,
    },
};
