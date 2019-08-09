import { BoundingRect, Point } from '.';

export interface TableScrollerState {
    /** 
     * "Abstract" scroll position within the range of `0` to `1`,
     * where `0` is no scroll and `1` full scroll.
     */
    position: number;
    /**
     * Current scroll position of the table in pixels. In theory, it could be calculated
     * using the `position` value and table dimensions, but this occasionally leads to
     * incorrect values due to decimal rounding errors, hence a separate value.
     * 
     * Ranges from `0` (no scroll) to `contentWrapper` size minus `mainWrapper` size (100% scroll).
     */
    scrollOffset: number;
    /** 
     * Indicates whether scrolling is in progress, i.e. whether the user is holding the
     * scrollbar handle.
     */
    isScrolling: boolean;
    /**
     * Number of table columns. With this information, combined with actual table dimensions,
     * it's possible to calculate left edges of table columns, which serve as scroll snap points.
     */
    columns: number;
    /**
     * Bounding rectangles of those DOM elements that need to be measured for the scrolling
     * mechanism to work correctly. Note that these are supposed to be updated whenever their actual
     * dimensions change.
     */
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
