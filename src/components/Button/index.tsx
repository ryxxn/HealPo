import React from 'react'
import "./style.scss"
import { IonRippleEffect } from '@ionic/react'

interface ButtonPropsType {
    id?:string,
    className?: "setting" | "main" | "close",
    size: "large" | "medium" | "small",
    text: string,
    onClick: Function,
    disabled?: boolean,
}
/**
 * 버튼
 * @param {string} id 버튼 종류 여부
 * @param {boolean} run 타미어 시작 여부
 * @param {boolean} disabled disabled 여부
 * @returns {*} .
 */
export const Button: React.FC<ButtonPropsType> = ({ id="", size="medium", text, onClick, disabled = false, className="" }) => {
    return (
        <button
            className={`HPButton ${size} ${className} ion-activatable ripple-parent`}
            id={id}
            onClick={() => onClick()}
            disabled={disabled}
        >
            {text}
            <IonRippleEffect></IonRippleEffect>
        </button>
    )
}
