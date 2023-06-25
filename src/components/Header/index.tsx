import React from 'react';
import { IonIcon} from '@ionic/react';
import './style.scss';
import { caretForward, chevronBackOutline } from 'ionicons/icons';

interface HeaderProps {
    title?: boolean;
    back?: boolean;
    run?: boolean;
}

/**
 * 헤더
 * @param {boolean} title title 텍스트(Healpo) 여부
 * @param {boolean} back 뒤로가기 버튼 여부
 * @param {boolean} run 타미어 시작 여부
 * @returns {*} .
 */
export const Header: React.FC<HeaderProps> = ({ title = false, back = false, run = false }) => {
    return (
        <header className="header">
            {title ? <p>Healpo</p> : null}
            {back ? <IonIcon icon={chevronBackOutline} style={{fontSize:"24px"}}/> : null}
            {run ? <IonIcon icon={caretForward} style={{fontSize:"24px", color:"var(--tomato200)"}}/> : null}
        </header>
    );
};
