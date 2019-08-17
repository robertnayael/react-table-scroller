import { BoundingRect, Point } from '.';

export interface TableScrollerState {
    /** 
     * Scroll position within the range of `0` to `1`, where `0` is no scroll and `1` full scroll.
     */
    scrollPositionPercentage: number;
    /**
     * Scroll position of the table in pixels. In theory, it could be calculated
     * using the `scrollPositionPercentage` value and table dimensions, but this
     * occasionally leads to incorrect values due to decimal rounding errors,
     * hence a separate value.
     * 
     * Ranges from `0` (no scroll) to `contentWrapper` size minus `mainWrapper` size (100% scroll).
     */
    scrollPositionPx: number;
    /**
     * Inidicates what proportion of the table is visible at any moment. E.g. `0.25` means that
     * 1/4 of the table is visible.
     */
    visibleContentPercentage: number;
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
     * DOM elements whose position and/or dimensions need to be measured at various points in time.
     */
    elements: {
        mainWrapper: HTMLDivElement | null;
        contentWrapper: HTMLDivElement | null;
        scrollbar: HTMLDivElement | null;
    };
    /**
     * Bounding rectangles of those DOM elements that need to be measured for the scrolling
     * mechanism to work correctly. Note that these are supposed to be updated whenever their actual
     * dimensions change.
     */
    rects: {
        mainWrapper: BoundingRect | null;
        contentWrapper: BoundingRect | null;
        scrollbar: BoundingRect | null;
    };
    /** Mouse position on scroll start */
    startPosition: {
        absolute: Point | null;
        relativeToHandler: Point | null;
    };
}
