import React from 'react';

import { TableScrollerActions } from './reducer';
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
    const handlerWidth = visibleContentPercentage * 100;
    return (
        <div className="scrollbar">
            <div
                className="handler"
                style={{
                    width: `${visibleContentPercentage}%`
                }}
            />
        </div>
    );
};
