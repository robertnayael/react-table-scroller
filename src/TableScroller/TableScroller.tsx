import React, { useEffect, useReducer, useState } from 'react';

import { actions, tableScrollerReducer, initialState } from './reducer';
import { Scrollbar } from './';
import './TableScroller.css';

export const TableScroller: React.FC = ({ children }) => {

    const [ state, dispatch ] = useReducer(tableScrollerReducer, initialState);

    console.table(state)

    const [ mainWrapper, mainWrapperRef ] = useState<HTMLDivElement | null>(null);
    const [ contentWrapper, contentWrapperRef ] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        dispatch(actions.updateMainWrapperElem(mainWrapper));
        dispatch(actions.updateContentWrapperElem(contentWrapper));
    }, [ mainWrapper, contentWrapper ]);

    const onFocus = () => {};
    const { isScrolling, scrollPositionPx, visibleContentPercentage } = state;

    return (
        <div className="enclosing-wrapper">
            <Scrollbar 
                dispatch={dispatch}
                handlerPosition={0}
                isScrolling={isScrolling}
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
