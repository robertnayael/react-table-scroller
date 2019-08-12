import React, { useRef, useEffect, useReducer } from 'react';

import { actions, tableScrollerReducer, initialState } from './reducer';
import { useRectDispatcher } from './helpers';
import { Scrollbar } from './';
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
    const visibleContentPercentage = state.rects.mainWrapper.width / state.rects.contentWrapper.width;

    return (
        <div className="enclosing-wrapper">
            <Scrollbar 
                dispatch={dispatch}
                handlerPosition={0}
                isScrolling={false}
                visibleContentPercentage={visibleContentPercentage}
            />
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
        </div>
    );
};
