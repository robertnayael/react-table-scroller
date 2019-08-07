import { createAction } from 'typesafe-actions';

import { BoundingRect, Point } from '../models';

export const updateMainWrapperRect = createAction('UpdateMainWrapperRect', action => 
    (rect: BoundingRect) =>
        action({ rect })
);

export const updateContentWrapperRect = createAction('UpdateContentWrapperRect', action =>
    (rect: BoundingRect) =>
        action({ rect })
);

export const updateScrollbarRect = createAction('UpdateScrollbarRect', action =>
    (rect: BoundingRect) =>
        action({ rect })
);

export const scrollStart = createAction('ScrollStart', action =>
    (startPositionAbsolute: Point, startPositionRelative: Point) =>
        action({ startPositionAbsolute, startPositionRelative })
);

export const scrollMove = createAction('ScrollMove', action =>
    (mousePositionAbsolute: Point) =>
        action({ mousePositionAbsolute })
);

export const scrollEnd = createAction('ScrollEnd', action =>
    () => action()
);

export const scrollStep = createAction('ScrollStep', action =>
    (mousePositionAbsolute: Point) =>
        action({ mousePositionAbsolute })
);

export const scrollStepBack = createAction('ScrollStepBack', action =>
    () => action()
);

export const scrollStepForward = createAction('ScrollStepForward', action =>
    () => action()
);
