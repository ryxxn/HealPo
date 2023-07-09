import React from 'react'
import "./style.scss"

export interface DotPropsType {
    position: number,
    color: string
}

export const Dot: React.FC<DotPropsType> = ({ position, color }) => {
    return (
        <div className="dot" style={{ left: `${position}px`, backgroundColor: color }}></div>
    )
}
