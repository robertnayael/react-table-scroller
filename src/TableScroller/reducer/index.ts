import { ActionType } from 'typesafe-actions';

import * as actions from './actions';
export { actions };
export type TableScrollerActions = ActionType<typeof actions>;

export * from './initialState';
export * from './tableScrollerReducer';
