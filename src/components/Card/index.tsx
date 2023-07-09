import React from 'react'
import "./style.scss"
import { iconsData } from '../../static'
import { IonIcon, IonRippleEffect } from '@ionic/react'
import { add } from 'ionicons/icons'
import { useHistory } from 'react-router'


interface CardProps {
    name: string
    iconNum: number
    id: string
}

/**
 * 카드
 * @param {string} name 아이콘 이름
 * @param {num} iconNum 아이콘 번호
 * @returns {*} .
 */

export const Card: React.FC<CardProps> = ({ name, iconNum, id }) => {

    const history = useHistory();


    // 내 운동 추가 카드이면
    if (name === "add") {
        return (
            <div className="addCard ion-activatable ripple-parent" onClick={() => history.push("/setting/" + id)}>
                <IonIcon icon={add} style={{ fontSize: "32px" }} />
                <IonRippleEffect></IonRippleEffect>
            </div>
        )
    }
    // 아니면
    return (
        <div className="card ion-activatable ripple-parent" onClick={() => history.push("/setting/" + id)}>
            <p>{name}</p>
            <img src={"/assets/icons/" + iconsData[iconNum].name}></img>
            <IonRippleEffect></IonRippleEffect>
        </div>
    )
}
