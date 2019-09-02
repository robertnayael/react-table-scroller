import React, { useEffect, useReducer, useState, useCallback } from 'react';

import { actions, tableScrollerReducer, initialState } from './reducer';
import { Scrollbar } from './';
import './styles.css';

/**
 * This component is exected to wrap a table and provides a fine-tuned scrolling
 * functionality if the underlying table has a larger width than that of the wrapper.
 * 
 * Note that the wrapper occupies the full available width and height, so in order to
 * control its dimensions just make sure that it's enclosed in a container
 * of the desired size.
 */
export const TableScroller: React.FC = ({ children }) => {

    const [ state, dispatch ] = useReducer(tableScrollerReducer, initialState);

    const [ mainWrapper, mainWrapperRef ] = useState<HTMLDivElement | null>(null);
    const [ viewport, viewportRef ] = useState<HTMLDivElement | null>(null);
    const [ contentWrapper, contentWrapperRef ] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        dispatch(actions.updateViewportNode(viewport));
        dispatch(actions.updateContentWrapperNode(contentWrapper));
    }, [ viewport, contentWrapper ]);

    const resetScroll = useCallback(
        () => viewport && (viewport.scrollLeft = 0),
        [viewport ]
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

    const onWheel = useCallback(
        (e: WheelEvent) => {
            e.preventDefault();
            const action = Math.sign(e.deltaY) < 0
                ? actions.scrollStepBack()
                : actions.scrollStepForward();
            dispatch(action);
        },
        [ dispatch ]
    );

    /* Adding this event listener via React props makes it impossible to call
       `preventDefault()`, which we need to do so that scrolling the table doesn't
       cause the whole document to be scrolled at the same time.
     */
    useEffect(() => {
        if (mainWrapper) {
            mainWrapper.addEventListener('wheel', onWheel);
        }
        return () => {
            if (mainWrapper) {
                mainWrapper.removeEventListener('wheel', onWheel); }
            }
    }, [ mainWrapper, onWheel ]);

    const { handlerPositionPx, isScrolling, scrollPositionPx, visibleContentPercentage } = state;

    return (
        <div
            className="main-wrapper"
            ref={mainWrapperRef}
        >
            <Scrollbar 
                dispatch={dispatch}
                handlerPosition={handlerPositionPx}
                isScrolling={isScrolling}
                visibleContentPercentage={visibleContentPercentage}
            />
            <div
                ref={viewportRef}
                className="viewport"
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
