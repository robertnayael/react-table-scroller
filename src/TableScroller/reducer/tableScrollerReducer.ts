import { getType } from 'typesafe-actions';

import { TableScrollerState } from '../models';
import { actions, TableScrollerActions } from './';

export function tableScrollerReducer(state: TableScrollerState, action: TableScrollerActions): TableScrollerState {

    switch (action.type) {

        case getType(actions.updateMainWrapperRect): {
            return {
                ...state,
                isScrolling: false,
                position: 0,
                rects: {
                    ...state.rects,
                    mainWrapper: action.payload.rect
                }
            };
        }

        case getType(actions.updateContentWrapperRect): {
            return {
                ...state,
                isScrolling: false,
                position: 0,
                rects: {
                    ...state.rects,
                    contentWrapper: action.payload.rect
                }
            };
        }
    }
    
    return  state;
}
