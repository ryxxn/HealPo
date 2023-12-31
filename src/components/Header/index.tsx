import React from 'react';
import { IonIcon } from '@ionic/react';
import './style.scss';
import { caretForward, chevronBackOutline, trash } from 'ionicons/icons';
import { useHistory } from 'react-router';

interface HeaderProps {
    title?: boolean;
    back?: boolean;
    del?: boolean;
    handleDeleteClick?: any;
}

/**
 * 헤더
 * @param {boolean} title title 텍스트(Healpo) 여부
 * @param {boolean} back 뒤로가기 버튼 여부
 * @param {boolean} delete 타미어 시작 여부
 * @returns {*} .
 */
export const Header: React.FC<HeaderProps> = ({ title = false, back = false, del = false, handleDeleteClick }) => {

    const history = useHistory();

    return (
        <header className="header">
            {title ? <p>Healpo</p> : null}
            {back ? <IonIcon icon={chevronBackOutline} style={{ fontSize: "24px" }} onClick={() => history.goBack()} /> : null}
            {del ? <IonIcon id="trash" icon={trash} style={{ fontSize: "24px" }} onClick={handleDeleteClick}/> : null}
        </header>
    );
};
