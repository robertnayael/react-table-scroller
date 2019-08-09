import { BoundingRect, TableScrollerState } from '../models';

const emptyRect: BoundingRect = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
}

export const initialState: TableScrollerState = {
    position: 0,
    scrollOffset: 0,
    isScrolling: false,
    columns: 0,
    rects: {
        mainWrapper: emptyRect,
        contentWrapper: emptyRect,
        scrollbar: emptyRect,
    },
    startPosition: {
        absolute: null,
        relativeToHandler: null,
    },
};
