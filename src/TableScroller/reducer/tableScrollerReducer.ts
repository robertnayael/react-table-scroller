import { TableScrollerState } from '../models';
import { ActionTypes, TableScrollerAction } from './actions';

export function tableScrollerReducer(state: TableScrollerState, action: TableScrollerAction): TableScrollerState {

    switch (action.type) {

        case ActionTypes.UpdateMainWrapperRect: {
            return {
                ...state,
                isScrolling: false,
                position: 0,
                rects: {
                    ...state.rects,
                    mainWrapper: action.rect
                }
            };
        }

        case ActionTypes.UpdateContentWrapperRect: {
            return {
                ...state,
                isScrolling: false,
                position: 0,
                rects: {
                    ...state.rects,
                    contentWrapper: action.rect
                }
            };
        }
    }
    
    return  state;
}
