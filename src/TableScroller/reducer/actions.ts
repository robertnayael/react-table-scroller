import { createAction } from 'typesafe-actions';

import { Point } from '../models';

export const updateMainWrapperElem = createAction('UpdateMainWrapperElem', action => 
    (elem: HTMLDivElement | null) =>
        action({ elemName: 'mainWrapper', elem })
);

export const updateContentWrapperElem = createAction('UpdateContentWrapperElem', action =>
    (elem: HTMLDivElement | null) =>
        action({ elemName: 'contentWrapper', elem })
);

export const updateScrollbarElem = createAction('UpdateScrollbarElem', action =>
    (elem: HTMLDivElement | null) =>
        action({ elemName: 'scrollbar', elem })
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
