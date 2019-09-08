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
     * Pixel-based position of the scrollbar handler relative to the whole scrollbar. Ranges from
     * `0` to scrollbar width minus handler width.
     */
    handlerPositionPx: number;
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
    nodes: {
        /** Limits the viewable area of the underlying table */
        viewport: HTMLDivElement | null;
        /** Wraps the whole table (and ideally should have exactly the same dimensions as the table) */
        tableWrapper: HTMLDivElement | null;
        /** Whole scrollbar element */
        scrollbar: HTMLDivElement | null;
    };
    /**
     * Bounding rectangles of those DOM elements that need to be measured for the scrolling
     * mechanism to work correctly. Note that these are supposed to be updated whenever their actual
     * dimensions change.
     */
    rects: {
        /** Limits the viewable area of the underlying table */
        viewport: BoundingRect | null;
        /** Wraps the whole table (and ideally should have exactly the same dimensions as the table) */
        tableWrapper: BoundingRect | null;
        /** Whole scrollbar element */
        scrollbar: BoundingRect | null;
    };
    /** Absolute mouse position on scroll start */
    mousePosOnScrollStart: Point | null;
    /** Position of scrollbar handler on scroll start, relative to the whole scrollbar. */
    handlerPosOnScrollStart: Point | null;
}
