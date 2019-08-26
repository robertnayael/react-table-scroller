import { getType } from 'typesafe-actions';

import { TableScrollerState } from '../models';
import { actions, initialState, TableScrollerActions } from './';
import { getBoundingRect, getColumnPositions, getInnerTable, getNearestValue } from '../helpers';

export function tableScrollerReducer(state: TableScrollerState, action: TableScrollerActions): TableScrollerState {

    switch (action.type) {

        case getType(actions.updateMainWrapperElem):
        case getType(actions.updateContentWrapperElem):
        case getType(actions.updateScrollbarElem): {
            const { elem, elemName } = action.payload;

            const elements = {
                ...state.elements,
                [elemName]: elem
            };
            const rects = getRects(elements);
            return {
                ...initialState,
                visibleContentPercentage: getVisibleContentPercentage(rects),
                elements,
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
            const scrollPositionPx = Math.round((state.rects.contentWrapper!.width - state.rects.mainWrapper!.width) * scrollPositionPercentage);

            return {
                ...state,
                scrollPositionPercentage,
                scrollPositionPx,
                handlerOffset: handlerPosition
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
            const viewport = state.rects.mainWrapper!;
            const contentWrapper = state.elements.contentWrapper!.getBoundingClientRect();

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
                handlerOffset: handlerPosition
            };

        }
    }

    return  state;
}

function getRects(elems: TableScrollerState['elements']): TableScrollerState['rects'] {
    return {
        mainWrapper: elems.mainWrapper && getBoundingRect(elems.mainWrapper),
        contentWrapper: elems.contentWrapper && getBoundingRect(elems.contentWrapper),
        scrollbar: elems.scrollbar && getBoundingRect(elems.scrollbar),
    };
}

function getVisibleContentPercentage(rects: TableScrollerState['rects']): number {
    return rects.mainWrapper && rects.contentWrapper
        ? Math.min(1, rects.mainWrapper.width / rects.contentWrapper.width)
        : 0;
}

function getMaxScrollPosition(state: TableScrollerState) {
    return state.rects.contentWrapper!.width - state.rects.mainWrapper!.width;
}

function getSnapPoints(state: TableScrollerState) {
    const table = getInnerTable(state.elements.contentWrapper!);
    const maxPos = getMaxScrollPosition(state);
    return table
        ? getColumnPositions(table)
            .filter(pos => pos <= maxPos)
        : [ 0 ];
}

function stepScroll(state: TableScrollerState, direction: 1 | -1): TableScrollerState {
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
        handlerOffset: handlerPosition
    };
}
