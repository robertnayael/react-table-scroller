import { BoundingRect, Point } from '.';

export interface TableScrollerState {
    /** 
     * Current scroll position within the range of `0` to `1`,
     * where `0` is 0% and `1` is 100%.
     * */
    position: number;
    /** Indicates whether scroll is in progress */
    isScrolling: boolean;
    /** Number of table columns */
    columns: number;
    /** Bounding rectangles of DOM elements */
    rects: {
        mainWrapper: BoundingRect;
        contentWrapper: BoundingRect;
        scrollbar: BoundingRect;
    };
    /** Mouse position on scroll start */
    startPosition: {
        absolute: Point | null;
        relativeToHandler: Point | null;
    };
}
