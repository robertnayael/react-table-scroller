import React, { useRef, useEffect } from 'react';

import { useRectDispatcher } from './helpers';
import { actions, TableScrollerActions } from './reducer';
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

    const scrollbarRef = useRef<HTMLDivElement>(null);
    useRectDispatcher(dispatch, actions.updateScrollbarRect, scrollbarRef);

    const handlerWidth = visibleContentPercentage * 100;
    return (
        <div
            ref={scrollbarRef}
            className="scrollbar"
        >
            <div
                className="handler"
                style={{
                    width: `${handlerWidth}%`
                }}
            />
        </div>
    );
};
