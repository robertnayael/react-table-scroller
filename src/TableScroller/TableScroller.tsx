import React, { useRef, useEffect, useReducer } from 'react';

import { actions, tableScrollerReducer, initialState } from './reducer';
import { useRectDispatcher } from './helpers';
import './TableScroller.css';

export const TableScroller: React.FC = ({ children }) => {

    const [ state, dispatch ] = useReducer(tableScrollerReducer, initialState);

    console.log(state)

    const mainWrapperRef = useRef<HTMLDivElement>(null);
    const contentWrapperRef = useRef<HTMLDivElement>(null);

    useRectDispatcher(dispatch, actions.updateMainWrapperRect, mainWrapperRef);
    useRectDispatcher(dispatch, actions.updateContentWrapperRect, contentWrapperRef);

    const contentOffset = 0;
    const onFocus = () => {};
    const smoothScrolling = !state.isScrolling;

    return (
        <div
            ref={mainWrapperRef}
            className="main-wrapper"
        >
            <div
                ref={contentWrapperRef}
                onFocus={onFocus}
                className="content-wrapper"
                style={{
                    transition: smoothScrolling ? 'transform .25s' : 'none',
                    transform: `translateX(-${contentOffset}px)`
                }}
            >
                {children}
            </div>
        </div>
    );
};
