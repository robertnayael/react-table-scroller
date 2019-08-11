import React, { useLayoutEffect } from 'react';

import { BoundingRect } from "../models";
import { getBoundingRect } from './';

type Dispatch = (action: any) => void;
type ActionCreator = (rects: BoundingRect) => any;
type Ref = React.RefObject<HTMLElement>;

export const useRectDispatcher = (dispatch: Dispatch, actionCreator: ActionCreator, ref: Ref) => {
    useLayoutEffect(() => {
        const runMeasurement = () => requestAnimationFrame(() => {
            const rect = ref.current ? getBoundingRect(ref.current) : null;
            if (rect) {
                dispatch(actionCreator(rect));
            }
        });
        runMeasurement();
        window.addEventListener('resize', runMeasurement);
        return () => window.removeEventListener('resize', runMeasurement);
    }, [ ref ]);
};
