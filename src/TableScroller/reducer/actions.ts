import { createAction } from 'typesafe-actions';

import { Point } from '../models';

export const updateViewportNode = createAction('UpdateViewportNode', action => 
    (node: HTMLDivElement | null) =>
        action({ nodeName: 'viewport', node })
);

export const updateContentWrapperNode = createAction('UpdateContentWrapperNode', action =>
    (node: HTMLDivElement | null) =>
        action({ nodeName: 'contentWrapper', node })
);

export const updateScrollbarNode = createAction('UpdateScrollbarNode', action =>
    (node: HTMLDivElement | null) =>
        action({ nodeName: 'scrollbar', node })
);

export const scrollStart = createAction('ScrollStart', action =>
    (mousePosition: Point) =>
        action({ mousePosition })
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

export const focusChange = createAction('FocusChange', action =>
    (focusedElem: HTMLElement) =>
        action({ focusedElem })
);
