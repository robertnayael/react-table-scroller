import { TableScrollerState } from '../models';

export const initialState: TableScrollerState = {
    scrollPositionPercentage: 0,
    scrollPositionPx: 0,
    handlerPositionPx: 0,
    visibleContentPercentage: 0,
    isScrolling: false,
    columns: 0,
    nodes: {
        viewport: null,
        contentWrapper: null,
        scrollbar: null,
    },
    rects: {
        viewport: null,
        contentWrapper: null,
        scrollbar: null,
    },
    mousePosOnScrollStart: null,
    handlerPosOnScrollStart: null
};
