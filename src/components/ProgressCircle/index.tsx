import React, { useEffect, useState } from 'react';
import './style.scss';

interface ProgressBarProps {
    deg: number;
    time: number;
}

export const ProgressCircle: React.FC<ProgressBarProps> = ({ deg, time }) => {

    return (
        <div className="progress-bar">
            <div className="outer-circle"></div>
            <div className="treceCircle" style={{ background: `conic-gradient(var(--tomato100), ${deg / 360 * 100}%, transparent 0)` }}>
                <div>
                    {time}
                </div>
            </div>
            <div
                className="inner-circle"
                style={{ transform: `rotate(${deg}deg` }}
            >
                <div className="dot" />
            </div>
        </div>
    );
};
