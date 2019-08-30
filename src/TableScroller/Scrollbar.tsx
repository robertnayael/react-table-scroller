import React, { useState, useCallback, useEffect } from 'react';

import { actions, TableScrollerActions } from './reducer';
import { getMousePosition } from './helpers';
import './Scrollbar.css';

interface ScrollbarProps {
    dispatch: React.Dispatch<TableScrollerActions>;
    handlerPosition: number;
    isScrolling: boolean;
    visibleContentPercentage: number;
};

export const Scrollbar: React.FC<ScrollbarProps> = ({
    dispatch,
    handlerPosition,
    isScrolling,
    visibleContentPercentage
}) => {

    const [scrollbar, scrollbarRef] = useState<HTMLDivElement | null>(null);

    const onScrollStart = useCallback(
        (e: React.MouseEvent) => {
            /* While these event listeners could be added/removed using `useEffect` (based on
               the current value of `isScrolling` prop), this causes problems due to the
               asynchronous nature of React's change propagation. For example, a mouse up event
               disables the `isScrolling` flag in the parent component's state. We expect that
               after that, mouse move events will no longer emit. However, before the new value
               of the flag makes it to this component, and before the event listener is removed,
               it may have enough time to notify further events. We could prevent the resulting
               bugs by using more flags, but it's more hassle-free to just handle event listeners
               imperatively in this case.
             */
            addListeners();
            dispatch(actions.scrollStart(getMousePosition(e)));
        },
        [ dispatch ]  // eslint-disable-line react-hooks/exhaustive-deps
    );

    const onScrollMove = useCallback(
        (e: MouseEvent) => {
            /* Without calling `preventDefault`, an occasional bug appears where
               after a few events no further events are notified to this handler,
               even though the event listener has not been removed. Not really sure
               what's the reason behind this :(
            */
            e.preventDefault();
            dispatch(actions.scrollMove(getMousePosition(e)))
        },
        [ dispatch ]
    );

    const onScrollEnd = useCallback(
        () => {
            clearListeners();
            dispatch(actions.scrollEnd())
        },
        [ dispatch ] // eslint-disable-line react-hooks/exhaustive-deps
    );

    const onScrollStep = useCallback(
        (e: React.MouseEvent) => {
            if (e.target === e.currentTarget) {
                dispatch(actions.scrollStep({
                    x: e.clientX,
                    y: e.clientY
                }));
            }
        },
        [ dispatch ]
    );

    const addListeners = useCallback(() => {
        document.addEventListener('mouseup', onScrollEnd);
        document.addEventListener('mouseleave', onScrollEnd);
        document.addEventListener('mousemove', onScrollMove);
    }, [ onScrollMove, onScrollEnd ]);

    const clearListeners = useCallback(() => {
        document.removeEventListener('mouseup', onScrollEnd);
        document.removeEventListener('mouseleave', onScrollEnd);
        document.removeEventListener('mousemove', onScrollMove);
    }, [ onScrollMove, onScrollEnd ]);

    useEffect(() => {
        dispatch(actions.updateScrollbarNode(scrollbar));
    }, [ dispatch, scrollbar ]);

    useEffect(() => clearListeners, [ clearListeners ]);

    const handlerWidth = visibleContentPercentage * 100;
    return (
        <div
            ref={scrollbarRef}
            className="scrollbar"
            onClick={onScrollStep}
        >
            <div
                onMouseDown={onScrollStart}
                className="handler"
                style={{
                    transition: isScrolling ? 'none' : 'transform .25s',
                    width: `${handlerWidth}%`,
                    transform: `translateX(${handlerPosition}px)`,
                }}
            />
        </div>
    );
};
