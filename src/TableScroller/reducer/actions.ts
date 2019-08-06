import { BoundingRect, Point } from '../models';

export enum ActionTypes {
    UpdateMainWrapperRect = 'UpdateMainWrapperRect',
    UpdateContentWrapperRect = 'UpdateContentWrapperRect',
    UpdateScrollbarRect = 'UpdateScrollbarRect',
    ScrollStart = 'ScrollStart',
    ScrollMove = 'v',
    ScrollEnd = 'ScrollEnd',
    ScrollStep = 'ScrollStep',
    ScrollStepBack = 'ScrollStepBack',
    ScrollStepForward = 'ScrollStepForward',
}

const updateMainWrapperRect = (rect: BoundingRect): {
    type: ActionTypes.UpdateMainWrapperRect;
    rect: BoundingRect;
} => ({
    type: ActionTypes.UpdateMainWrapperRect,
    rect,
});

const updateContentWrapperRect = (rect: BoundingRect): {
    type: ActionTypes.UpdateContentWrapperRect;
    rect: BoundingRect;
} => ({
        type: ActionTypes.UpdateContentWrapperRect,
    rect,
});

const updateScrollbarRect = (rect: BoundingRect): {
    type: ActionTypes.UpdateScrollbarRect;
    rect: BoundingRect;
} => ({
    type: ActionTypes.UpdateScrollbarRect,
    rect,
});

const scrollStart = (startPositionAbsolute: Point, startPositionRelative: Point): {
    type: ActionTypes.ScrollStart;
    startPositionAbsolute: Point;
    startPositionRelative: Point;
} => ({
    type: ActionTypes.ScrollStart,
    startPositionAbsolute,
    startPositionRelative,
});

const scrollMove = (mousePositionAbsolute: Point): {
    type: ActionTypes.ScrollMove;
    mousePositionAbsolute: Point;
} => ({
    type: ActionTypes.ScrollMove,
    mousePositionAbsolute,
});


const scrollEnd = (): {
    type: ActionTypes.ScrollEnd;
} => ({
    type: ActionTypes.ScrollEnd,
});

const scrollStep = (mousePositionAbsolute: Point): {
    type: ActionTypes.ScrollStep;
    mousePositionAbsolute: Point;
} => ({
    type: ActionTypes.ScrollStep,
    mousePositionAbsolute,
});

const scrollStepBack = (): {
    type: ActionTypes.ScrollStepBack;
} => ({
    type: ActionTypes.ScrollStepBack,
});

const scrollStepForward = (): {
    type: ActionTypes.ScrollStepForward;
} => ({
    type: ActionTypes.ScrollStepForward,
});

export const actions = {
    updateMainWrapperRect,
    updateContentWrapperRect,
    updateScrollbarRect,
    scrollStart,
    scrollMove,
    scrollEnd,
    scrollStep,
    scrollStepBack,
    scrollStepForward,
}

type UpdateMainWrapperRect = ReturnType<typeof updateMainWrapperRect>
type UpdateContentWrapperRect = ReturnType<typeof updateContentWrapperRect>
type UpdateScrollbarRect = ReturnType<typeof updateScrollbarRect>
type ScrollStart = ReturnType<typeof scrollStart>
type ScrollMove = ReturnType<typeof scrollMove>
type ScrollEnd = ReturnType<typeof scrollEnd>
type ScrollStep = ReturnType<typeof scrollStep>
type ScrollStepBack = ReturnType<typeof scrollStepBack>
type ScrollStepFoward = ReturnType<typeof scrollStepForward>

export type TableScrollerAction =
    | UpdateMainWrapperRect
    | UpdateContentWrapperRect
    | UpdateScrollbarRect
    | ScrollStart
    | ScrollMove
    | ScrollEnd
    | ScrollStep
    | ScrollStepBack
    | ScrollStepFoward;
