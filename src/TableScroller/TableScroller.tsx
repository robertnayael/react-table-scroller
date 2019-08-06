import React, { useRef, useEffect, useReducer } from 'react';

import { actions, tableScrollerReducer, initialState } from './reducer';
import './TableScroller.css';

export const TableScroller: React.FC = ({ children }) => {

    const [ state, dispatch ] = useReducer(tableScrollerReducer, initialState);

    console.log(state)

    const mainWrapperRef = useRef<HTMLDivElement>(null);
    const contentWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mainWrapperRef.current) {
            const rect = mainWrapperRef.current.getBoundingClientRect();
            dispatch(actions.updateMainWrapperRect(rect));
        }
    }, []);

    useEffect(() => {
        if (contentWrapperRef.current) {
            const rect = contentWrapperRef.current.getBoundingClientRect();
            dispatch(actions.updateContentWrapperRect(rect));
        }
    }, []);

    const contentOffset = 0;
    const onFocus = () => {};
    const smoothScrolling = !state.isScrolling;

    return (
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
    );
};
