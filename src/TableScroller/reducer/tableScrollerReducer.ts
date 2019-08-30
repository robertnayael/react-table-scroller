import { getType } from 'typesafe-actions';

import { TableScrollerState } from '../models';
import { actions, initialState, TableScrollerActions } from './';
import {
    getBoundingRect,
    getColumnPositions,
    getInnerTable,
    getNearestValue
} from '../helpers';

export function tableScrollerReducer(
    state: TableScrollerState,
    action: TableScrollerActions
): TableScrollerState {

    switch (action.type) {

        case getType(actions.updateViewportNode):
        case getType(actions.updateContentWrapperNode):
        case getType(actions.updateScrollbarNode): {
            const { node, nodeName } = action.payload;

            const nodes = {
                ...state.nodes,
                [nodeName]: node
            };
            const rects = getRects(nodes);
            return {
                ...initialState,
                visibleContentPercentage: getVisibleContentPercentage(rects),
                nodes,
                rects
            };
        }

        case getType(actions.scrollStart): {
            const { width: scrollbarWidth } = state.rects.scrollbar!;

            const handlerWidth = scrollbarWidth * state.visibleContentPercentage;
            const activeScrollWidth = scrollbarWidth - handlerWidth;
            const handlerPosition = {
                x: activeScrollWidth * state.scrollPositionPercentage,
                y: 0 // TODO: handle vertical scroll as well
            };

            const { mousePosition } = action.payload;

            return {
                ...state,
                isScrolling: true,
                mousePosOnScrollStart: mousePosition,
                handlerPosOnScrollStart: handlerPosition
            };
        }

        case getType(actions.scrollMove): {
            const { width: scrollbarWidth } = state.rects.scrollbar!;

            const handlerWidth = scrollbarWidth * state.visibleContentPercentage;
            const activeScrollWidth = scrollbarWidth - handlerWidth;
            const clampPosition = (position: number) =>
                Math.min(activeScrollWidth, Math.max(0, position));

            const mouseDistanceSinceStart = action.payload.mousePositionAbsolute.x - state.mousePosOnScrollStart!.x;
            const handlerPosition = clampPosition(state.handlerPosOnScrollStart!.x + mouseDistanceSinceStart);
            const scrollPositionPercentage = handlerPosition / activeScrollWidth;
            const scrollPositionPx = Math.round((state.rects.contentWrapper!.width - state.rects.viewport!.width) * scrollPositionPercentage);

            return {
                ...state,
                scrollPositionPercentage,
                scrollPositionPx,
                handlerPositionPx: handlerPosition
            };
        }

        case getType(actions.scrollEnd): {
            const scrollPos = state.scrollPositionPx;
            const snapPoints = getSnapPoints(state);
            const snappedPos = getNearestValue(snapPoints, scrollPos);

            const position = {
                scrollPositionPx: snappedPos,
                scrollPositionPercentage: snappedPos / getMaxScrollPosition(state)
            };

            return {
                ...state,
                ...position,
                isScrolling: false,
                mousePosOnScrollStart: null,
                handlerPosOnScrollStart: null
            };
        }

        case getType(actions.scrollStep): {
            const mousePos = action.payload.mousePositionAbsolute.x;
            const { scrollbar } = state.rects;
            const scrollbarHandlerPos = scrollbar!.left + scrollbar!.width * state.scrollPositionPercentage;
            const direction = mousePos < scrollbarHandlerPos ? -1 : 1;
            return stepScroll(state, direction);
        }

        case getType(actions.scrollStepBack): {
            return stepScroll(state, -1);
        }

        case getType(actions.scrollStepForward): {
            return stepScroll(state, 1);
        }

        case getType(actions.focusChange): {
            const focusedElem = action.payload.focusedElem.getBoundingClientRect();
            const viewport = state.rects.viewport!;
            const contentWrapper = state.nodes.contentWrapper!.getBoundingClientRect();

            let pointToFind: number | null = null;

            if (focusedElem.right > viewport.right) {
                pointToFind = focusedElem.right - contentWrapper.left - viewport.width;
            } else if (focusedElem.left < viewport.left) {
                pointToFind = focusedElem.left - contentWrapper.left;
            }

            if (pointToFind === null) {
                return state;
            }

            const snapPoints = getSnapPoints(state);
            const newPos = getNearestValue(snapPoints, pointToFind);

            const scrollPosition = {
                scrollPositionPx: newPos,
                scrollPositionPercentage: newPos / getMaxScrollPosition(state)
            };
            const handlerWidth = state.rects.scrollbar!.width * state.visibleContentPercentage;
            const activeScrollWidth = state.rects.scrollbar!.width - handlerWidth;
            const handlerPosition = activeScrollWidth * scrollPosition.scrollPositionPercentage;

            return {
                ...state,
                ...scrollPosition,
                handlerPositionPx: handlerPosition
            };

        }
    }

    return  state;
}

/**
 * Calculates client rectangles of the provided DOM nodes
 * 
 * @param elems DOM nodes
 * @return client rectangles
 */
function getRects(nodes: TableScrollerState['nodes']): TableScrollerState['rects'] {
    return {
        viewport: nodes.viewport && getBoundingRect(nodes.viewport),
        contentWrapper: nodes.contentWrapper && getBoundingRect(nodes.contentWrapper),
        scrollbar: nodes.scrollbar && getBoundingRect(nodes.scrollbar),
    };
}

/**
 * Calculates the visible portion of the inner table
 * 
 * @param rects client rectangles of the relevant DOM nodes
 * @return proportion of the table that is visible at a time (`>0` and `<=1`)
 */
function getVisibleContentPercentage(rects: TableScrollerState['rects']): number {
    return rects.viewport && rects.contentWrapper
        ? Math.min(1, rects.viewport.width / rects.contentWrapper.width)
        : 0;
}

function getMaxScrollPosition(state: TableScrollerState): number {
    return state.rects.contentWrapper!.width - state.rects.viewport!.width;
}

/**
 * Calculates snap points in the inner table. Basically, these are the x
 * coordinates of table columns relative to the table wrapper.
 * 
 * @param state table scroller state
 * @return list of snap points
 */
function getSnapPoints(state: TableScrollerState): number[] {
    const table = getInnerTable(state.nodes.contentWrapper!);
    const maxPos = getMaxScrollPosition(state);
    return table
        ? getColumnPositions(table)
            .filter(pos => pos <= maxPos)
        : [ 0 ];
}

/**
 * Attempts to step the current scroll position to match the position of the
 * previous or next table column.
 * 
 * @param state table scroller state
 * @param direction `-1` (step scroll backward) or `1` (step scroll forward)
 * @return new table scroller state
 */
function stepScroll(
    state: TableScrollerState,
    direction: 1 | -1
): TableScrollerState {

    const snapPoints = getSnapPoints(state);
    const currentPos = getNearestValue(snapPoints, state.scrollPositionPx);
    const currentIndex = snapPoints.findIndex(snapPoint => snapPoint === currentPos);
    const newIndex = Math.min(snapPoints.length - 1, Math.max(0, currentIndex + direction));
    const newPos = snapPoints[newIndex];

    const scrollPosition = {
        scrollPositionPx: newPos,
        scrollPositionPercentage: newPos / getMaxScrollPosition(state)
    };

    const handlerWidth = state.rects.scrollbar!.width * state.visibleContentPercentage;
    const activeScrollWidth = state.rects.scrollbar!.width - handlerWidth;
    const handlerPosition = activeScrollWidth * scrollPosition.scrollPositionPercentage;

    return {
        ...state,
        ...scrollPosition,
        handlerPositionPx: handlerPosition
    };
}
