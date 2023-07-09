import React from 'react'
import "./Save.scss"
import { IonContent, IonPage } from '@ionic/react'
import { Container } from '../../components/Container'
import { Header } from '../../components/Header'
import { Storage } from '@ionic/storage';
import { Button } from '../../components/Button'
import { useHistory } from 'react-router'
import { MySetType, useSettingStore } from '../../store/store'
import { deepcopy, getLocalData, setLocalData } from '../../util'
import { iconsData } from '../../static'
import { IconCard } from '../../components/IconCard'
import uuid from 'react-uuid'

export const Save = () => {

    // 백그라운드 저장소에 데이터 저장하기
    const storage = new Storage();
    // storage.get('key').then((value) => {
    //     // 가져온 데이터 사용
    // });
    // storage.remove('key');

    const history = useHistory()

    const { data, setData, reset, fetchData } = useSettingStore();

    const setIndex = (e: number | string, type: string) => {
        let tmp = deepcopy(data);
        tmp[type] = e;
        setData(tmp);
    }

    const handleSave = () => {
        // 기존 db가 없으면
        if (!getLocalData('mySetData')) {
            setLocalData('mySetData', [{...data, id:uuid()}]);
            reset();
            fetchData();
            history.push("/home")
            return;
        }

        let mySetData: MySetType[] = [];

        // 기존 데이터가 존재하는 경우
        mySetData = getLocalData('mySetData');

        // 동일한 id가 있는지 확인
        const existingDataIndex = mySetData.findIndex((item) => item.id === data.id);

        // 동일한 id가 있으면 덮어쓰기
        if (existingDataIndex !== -1) {
            mySetData[existingDataIndex] = data;
        } else {
            // 동일한 id가 없으면 새로운 데이터 추가
            mySetData.push({...data, id:uuid()});
        }

        setLocalData('mySetData', mySetData);
        reset();
        fetchData();
        history.push("/home")
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <Header back />
                <Container>
                    <article className="saveContainer">
                        <section className="titleInputBox">
                            <p>운동 종목 입력</p>
                            <input placeholder='입력해주세요.' value={data.name} onChange={(e: any) => setIndex(e.target.value, "name")} />
                        </section>
                        <ul className="iconsBox">
                            {iconsData.map((obj: any, index: number) => (
                                <IconCard id={obj.id} key={index} />
                            ))}
                        </ul>
                        <section className="bottomBox">
                            <Button className={'main'} size={'large'} text={'저장'} onClick={() => handleSave()} disabled={data.iconNum == -1 || data.name === ""} />
                        </section>
                    </article>
                </Container>
            </IonContent>
        </IonPage>)
}
