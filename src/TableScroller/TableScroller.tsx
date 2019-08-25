import React, { useEffect, useReducer, useState, useCallback } from 'react';

import { actions, tableScrollerReducer, initialState } from './reducer';
import { Scrollbar } from './';
import './TableScroller.css';

export const TableScroller: React.FC = ({ children }) => {

    const [ state, dispatch ] = useReducer(tableScrollerReducer, initialState);

    const [ mainWrapper, mainWrapperRef ] = useState<HTMLDivElement | null>(null);
    const [ contentWrapper, contentWrapperRef ] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        dispatch(actions.updateMainWrapperElem(mainWrapper));
        dispatch(actions.updateContentWrapperElem(contentWrapper));
    }, [ mainWrapper, contentWrapper ]);

    const resetScroll = useCallback(
        () => mainWrapper && (mainWrapper.scrollLeft = 0),
        [ mainWrapper ]
    );

    const onFocus = useCallback(
            (e: React.FocusEvent<HTMLElement>) => {
            /* If the focused element lies beyond the visible area of the table wrapper,
            the browser may decide to modify the wrapper's scroll position so that
            the element is visible. We need to prevent this because our scroll mechanism
            is based on `translateX` style property rather than `scrollLeft`.
            */
            resetScroll();
            dispatch(actions.focusChange(e.target));
        },
        [ dispatch, resetScroll ]
    );

    const { handlerOffset, isScrolling, scrollPositionPx, visibleContentPercentage } = state;

    return (
        <div className="enclosing-wrapper">
            <Scrollbar 
                dispatch={dispatch}
                handlerPosition={handlerOffset}
                isScrolling={isScrolling}
                visibleContentPercentage={visibleContentPercentage}
            />
            <div
                ref={mainWrapperRef}
                className="main-wrapper"
                onScroll={resetScroll}
            >
                <div
                    ref={contentWrapperRef}
                    onFocus={onFocus}
                    className="content-wrapper"
                    style={{
                        transition: isScrolling ? 'none' : 'transform .25s',
                        transform: `translateX(-${scrollPositionPx}px)`
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};
