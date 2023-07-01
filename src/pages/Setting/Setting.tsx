import { IonButton, IonContent, IonIcon, IonItem, IonLabel, IonModal, IonPage } from '@ionic/react';
import React, { useRef, useState } from 'react'
import { useParams } from 'react-router';
import { Header } from '../../components/Header';
import { Container } from '../../components/Container';
import "./Setting.scss"
import { Bar } from '../../components/Bar/Index';
import { Dot, DotPropsType } from '../../components/Dot/Index';
import { Button } from '../../components/Button';
import { personCircle } from 'ionicons/icons';
import { Swiper } from '../../components/Swiper';

type settingParams = { id: string };


export const Setting = () => {

    const modal = useRef<HTMLIonModalElement>(null);

    function dismiss() {
        modal.current?.dismiss();
    }

    const { id: id } = useParams<settingParams>();

    const dotData: DotPropsType[] = [
        { position: 0, color: 'var(--tomato100)' },
        { position: 20, color: 'var(--tomato200)' },
    ];

    // 세트 수 설정 index
    const setInfo = ["1회", "2회", "3회", "4회", "5회", "6회", "7회", "8회", "9회", "10회"];
    const [setIndex, setSetIndex] = useState(0);
    // 휴식시간 수 설정 index
    const restInfo = ["1분", "2분", "3분", "4분", "5분"];
    const [restIndex, setRestIndex] = useState(0);
    // 반복 횟수 설정 index
    const repeatInfo = ["1회", "2회", "3회", "4회", "5회", "6회", "7회", "8회", "9회", "10회", "11회", "12회", "13회", "14회", "15회"];
    const [repeatIndex, setRepeatIndex] = useState(9);

    // 반복 시간 리스트
    const repeatSecInfo = ["1초", "2초", "3초", "4초", "5초", "6초", "7초", "8초", "9초", "10초"];
    const [repeatList, setRepeatList] = useState([{ name: "UP(DOWN)", index: 2 }, { name: "DOWN(UP)", index: 4 }]);

    const setDataOfRepeatList = (i: number, data: any, type: "index" | "name") => {
        let tmp = [...repeatList];
        if(type === "index"){
            tmp[i].index = data;
        }
        else{
            tmp[i].name = data;
        }
        setRepeatList(tmp);
    }


    return (
        <IonPage>
            <IonContent fullscreen>
                <Header back run />
                <Container>
                    <article className="settingContainer">
                        <section className="titleInputBox">
                            <p>운동 종목 입력</p>
                            <input placeholder='입력해주세요.' />
                        </section>
                        <section className="contentBox">
                            <div className="leftBox">
                                <div className="progressBox">
                                    <Bar />
                                    {dotData.map((obj: DotPropsType, index: number) => (
                                        <Dot position={obj.position} color={obj.color} key={index} />
                                    ))}
                                </div>
                            </div>
                            <div className="rightBox">
                                <p>세트 수 설정</p>
                                <Button id={"set"} className={'setting'} size={'medium'} text={setInfo[setIndex]} onClick={() => { }} />
                                {/* 세트 수 모달 */}
                                <IonModal id="modal" ref={modal} trigger="set">
                                    <div className="wrapper">
                                        <Swiper index={setIndex} setIndex={setSetIndex} data={setInfo} />
                                    </div>
                                </IonModal>
                                <p>세트 간 휴식 시간</p>
                                <Button id={"rest"} className={'setting'} size={'medium'} text={restInfo[restIndex]} onClick={() => { }} disabled={setIndex == 0} />
                                <IonModal id="modal" ref={modal} trigger="rest">
                                    <div className="wrapper">
                                        <Swiper index={restIndex} setIndex={setRestIndex} data={restInfo} />
                                    </div>
                                </IonModal>
                                {/* 구분선 */}
                                <div className="line"></div>
                                <p>반복 횟수</p>
                                <Button id={"repeat"} className={'setting'} size={'medium'} text={repeatInfo[repeatIndex]} onClick={() => { }} />
                                <IonModal id="modal" ref={modal} trigger="repeat">
                                    <div className="wrapper">
                                        <Swiper index={repeatIndex} setIndex={setRepeatIndex} data={repeatInfo} />
                                    </div>
                                </IonModal>
                                {repeatList.map((obj: any, index: number) => (
                                    <div key={index}>
                                        <p>{obj.name}</p>
                                        <Button id={`repeatList${index}`} className={'setting'} size={'medium'} text={repeatSecInfo[obj.index]} onClick={() => { }} />
                                        <IonModal id="modal" ref={modal} trigger={`repeatList${index}`}>
                                            <div className="wrapper">
                                                <input className="repeatListInput" value={obj.name} onChange={(e: any) => setDataOfRepeatList(index, e.target.value, "name")} placeholder="알림 이름 입력"/>
                                                <Swiper index={obj.index} setIndex={(ti: number) => setDataOfRepeatList(index, ti, "index")} data={repeatSecInfo} />
                                            </div>
                                        </IonModal>
                                    </div>
                                ))}
                            </div>
                        </section>
                        <section className="bottomBox">
                            <Button className={'main'} size={'large'} text={'저장'} onClick={() => { }} />
                        </section>
                    </article>
                </Container>
            </IonContent>
        </IonPage>
    )
}
