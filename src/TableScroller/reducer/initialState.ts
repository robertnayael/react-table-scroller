import { TableScrollerState } from '../models';

export const initialState: TableScrollerState = {
    scrollPositionPercentage: 0,
    scrollPositionPx: 0,
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
