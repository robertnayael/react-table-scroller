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
        (e: React.MouseEvent) => dispatch(actions.scrollStart(getMousePosition(e))),
        [ dispatch ]
    );

    const onScrollMove = useCallback(
        (e: MouseEvent) => dispatch(actions.scrollMove(getMousePosition(e))),
        [ dispatch ]
    );

    const onScrollEnd = useCallback(
        () => dispatch(actions.scrollEnd()),
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
        dispatch(actions.updateScrollbarElem(scrollbar));
    }, [ dispatch, scrollbar ]);

    useEffect(() => {
        isScrolling ? addListeners() : clearListeners();
        return clearListeners;
    }, [ addListeners, clearListeners, isScrolling ]);

    const handlerWidth = visibleContentPercentage * 100;
    return (
        <div
            ref={scrollbarRef}
            className="scrollbar"
        >
            <div
                onMouseDown={onScrollStart}
                className="handler"
                style={{
                    width: `${handlerWidth}%`,
                    transform: `translateX(${handlerPosition}px)`,
                }}
            />
        </div>
    );
};
