import { getType } from 'typesafe-actions';

import { TableScrollerState } from '../models';
import { actions, initialState, TableScrollerActions } from './';
import { getBoundingRect } from '../helpers';

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
            if (state.eventOrderError) {
                return {
                    ...state,
                    eventOrderError: false
                }
            }

            const {
                top: scrollbarTop,
                left: scrollbarLeft,
                width: scrollbarWidth
            } = state.rects.scrollbar!;

            const scrollbarHandlerWidth = scrollbarWidth * state.visibleContentPercentage;
            const activeScrollWidth = scrollbarWidth - scrollbarHandlerWidth;
            const relativeHandlerLeft = activeScrollWidth * state.scrollPositionPercentage;
            const absoluteHandlerLeft = relativeHandlerLeft + scrollbarLeft;

            const handlerPosition = {
                x: absoluteHandlerLeft,
                y: scrollbarTop
            };
            const { mousePosition } = action.payload;

            return {
                ...state,
                isScrolling: true,
                positionOnScrollStart: {
                    mouse: mousePosition,
                    scrollbarHandler: handlerPosition
                }
            };
        }

        case getType(actions.scrollMove): {
            if (!state.isScrolling) {
                return {
                    ...state,
                    eventOrderError: true
                };
            }

            const {
                left: scrollbarLeft,
                right: scrollbarRight,
                width: scrollbarWidth
            } = state.rects.scrollbar!;

            const handlerWidth = scrollbarWidth * state.visibleContentPercentage;

            const handlerPositionRange = {
                min: scrollbarLeft,
                max: scrollbarRight - handlerWidth
            };

            const clampPosition = (position: number) =>
                Math.min(handlerPositionRange.max, Math.max(handlerPositionRange.min, position));

            const mouseDistanceSinceStart = action.payload.mousePositionAbsolute.x - state.positionOnScrollStart.mouse!.x;
            const startHandlerPosition = state.positionOnScrollStart.scrollbarHandler!.x;
            const currentHandlerPosition = clampPosition(startHandlerPosition + mouseDistanceSinceStart);

            const activeScrollWidth = scrollbarWidth - handlerWidth;
            const scrollPositionPercentage = (currentHandlerPosition - scrollbarLeft) / activeScrollWidth;
            const scrollPositionPx = Math.round((state.rects.contentWrapper!.width - state.rects.mainWrapper!.width) * scrollPositionPercentage);
            const handlerOffset = currentHandlerPosition - scrollbarLeft;

            return {
                ...state,
                scrollPositionPercentage,
                scrollPositionPx,
                handlerOffset
            };
        }

        case getType(actions.scrollEnd): {
            return {
                ...state,
                isScrolling: false,
                positionOnScrollStart: {
                    mouse: null,
                    scrollbarHandler: null
                }
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
