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
