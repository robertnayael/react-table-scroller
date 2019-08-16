import React, { useState, useEffect } from 'react';

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

    const [scrollbar, scrollbarRef] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        dispatch(actions.updateScrollbarElem(scrollbar));
    }, [ scrollbar ]);

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
