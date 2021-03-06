import React, { useEffect, useReducer, useState, useCallback } from 'react';

import { actions, tableScrollerReducer, initialState } from './reducer';
import { Scrollbar } from './';

import styles from './TableScroller.module.css';

export interface TableScrollerProps {
    /** Whether to display the bottom scrollbar */
    bottomScrollbar?: boolean;
    /** Whether to display the top scrollbar */
    topScrollbar?: boolean;
    /** CSS class for scrollbar element */
    scrollbarClassname?: string;
    /** CSS class for scrollbar handler */
    handlerClassname?: string;
    /** CSS class for left scrollbar arrow */
    arrowLeftClassname?: string;
    /** CSS class for right scrollbar arrow */
    arrowRightClassname?: string;
}

/**
 * This component is exected to wrap a table and provides a fine-tuned scrolling
 * functionality if the underlying table has a larger width than that of the wrapper.
 * 
 * Note that the wrapper occupies the full available width and height, so in order to
 * control its dimensions just make sure that it's enclosed in a container
 * of the desired size.
 */
export const TableScroller: React.FC<TableScrollerProps> = ({
    children,
    bottomScrollbar = true,
    topScrollbar = true,
    ...props
}) => {
    const [ state, dispatch ] = useReducer(tableScrollerReducer, initialState);

    const [ mainWrapper, mainWrapperRef ] = useState<HTMLDivElement | null>(null);
    const [ viewport, viewportRef ] = useState<HTMLDivElement | null>(null);
    const [tableWrapper, tableWrapperRef ] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        dispatch(actions.updateViewportNode(viewport));
        dispatch(actions.updateTableWrapperNode(tableWrapper));
    }, [viewport, tableWrapper ]);

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
            className={styles['main-wrapper']}
            ref={mainWrapperRef}
        >
            <Scrollbar 
                if={topScrollbar}
                dispatch={dispatch}
                handlerPosition={handlerPositionPx}
                isScrolling={isScrolling}
                visibleContentPercentage={visibleContentPercentage}
                {...props}
            />
            <div
                ref={viewportRef}
                className={styles['viewport']}
                onScroll={resetScroll}
            >
                <div
                    ref={tableWrapperRef}
                    onFocus={onFocus}
                    className={styles['content-wrapper']}
                    style={{
                        transition: isScrolling ? 'none' : 'transform .25s',
                        transform: `translateX(-${scrollPositionPx}px)`
                    }}
                >
                    {children}
                </div>
            </div>
            <Scrollbar
                if={bottomScrollbar}
                dispatch={dispatch}
                handlerPosition={handlerPositionPx}
                isScrolling={isScrolling}
                visibleContentPercentage={visibleContentPercentage}
                {...props}
            />
        </div>
    );
};
