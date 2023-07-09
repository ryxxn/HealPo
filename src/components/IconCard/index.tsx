import React from 'react'
import "./style.scss"
import { iconsData } from '../../static'
import { useSettingStore } from '../../store/store';
import { deepcopy } from '../../util';

interface IconCardPropsType {
    id: number,
}

export const IconCard: React.FC<IconCardPropsType> = ({ id }) => {

    const {data, setData} = useSettingStore();

    const setIndex = (e: number | string, type: string) => {
        let tmp = deepcopy(data);
        tmp[type] = e;
        setData(tmp);
    }


    return (
        <li className="iconCard" onClick={() => setIndex(id, "iconNum")}>
            <input type="radio" id={iconsData[id].name} name="icons" />
            <label htmlFor={iconsData[id].name}>
                <img src={"/assets/icons/" + iconsData[id].name}></img>
            </label>
        </li>
    )
}
