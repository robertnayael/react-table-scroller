import { TableScrollerState } from '../models';

export const initialState: TableScrollerState = {
    eventOrderError: false,
    scrollPositionPercentage: 0,
    scrollPositionPx: 0,
    handlerOffset: 0,
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
    positionOnScrollStart: {
        mouse: null,
        scrollbarHandler: null,
    },
};
