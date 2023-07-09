import { IonButton, IonContent, IonFab, IonFabButton, IonIcon, IonItem, IonLabel, IonModal, IonPage, IonRippleEffect } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import { Header } from '../../components/Header';
import { Container } from '../../components/Container';
import "./Setting.scss"
import { Bar } from '../../components/Bar/Index';
import { Dot, DotPropsType } from '../../components/Dot/Index';
import { Button } from '../../components/Button';
import { caretForward, personCircle } from 'ionicons/icons';
import { Swiper } from '../../components/Swiper';
import { deepcopy, getLocalData, setLocalData } from '../../util';
import { MySetType, useSettingStore } from '../../store/store';
import { recommandData } from '../Home/Home';

type settingParams = { id: string };


export const Setting = () => {

    const modal = useRef<HTMLIonModalElement>(null);

    const dismiss = () => {
        modal.current?.dismiss();
    }

    const { id: id } = useParams<settingParams>();

    // const dotData: DotPropsType[] = [
    //     { position: 0, color: 'var(--tomato100)' },
    //     { position: 20, color: 'var(--tomato200)' },
    // ];

    const history = useHistory();

    const { data, setData, fetchData, reset } = useSettingStore();

    const setIndex = (e: number | string, type: string) => {
        let tmp = deepcopy(data);
        tmp[type] = e;
        setData(tmp);
    }

    // 세트 수 설정 index
    const setInfo = ["1회", "2회", "3회", "4회", "5회", "6회", "7회", "8회", "9회", "10회"];

    // 휴식시간 수 설정 index
    const restInfo = ["1분", "2분", "3분", "4분", "5분"];

    // 반복 횟수 설정 index
    const repeatInfo = ["1회", "2회", "3회", "4회", "5회", "6회", "7회", "8회", "9회", "10회", "11회", "12회", "13회", "14회", "15회"];

    // 반복 시간 리스트
    const repeatSecInfo = ["1초", "2초", "3초", "4초", "5초", "6초", "7초", "8초", "9초", "10초"];


    const setDataOfRepeatList = (i: number, e: any, type: "index" | "name") => {
        let tmp = deepcopy(data);
        tmp.repeatList[i][type] = e;
        setData(tmp);
    }

    // 신규인지
    const [isNew, setIsNew] = useState(true);
    // 추천 운동인지
    const [isRecommand, setIsRecommand] = useState<boolean>(false);

    const handleDelete = (id: string) => {

        let tmp = getLocalData('mySetData');
        tmp = tmp.filter((obj: any) => obj.id !== id)
        setLocalData("mySetData", tmp);
        fetchData();
        reset();
        dismiss();
        history.push('/home');
    }

    // 수정이면
    useEffect(() => {
        
        const mySetData: MySetType[] = getLocalData('mySetData');
        // 신규이면
        if (id === undefined) {
            return(()=>{
                reset();
            })
        };
        // 추천 운동이면
        if (id.includes("recommand")) {
            const tmp: MySetType[] = recommandData.filter((obj: MySetType) => obj.id === id);
            setData(tmp[0]);
            setIsRecommand(true);
            return(()=>{
                reset();
            })
        }
        
        // 기존 데이터가 존재하는 경우
        // 동일한 id가 있는지 확인
        const existingDataIndex = mySetData.findIndex((item) => item.id === id);
        
        // 동일한 id가 있으면 덮어쓰기
        if (existingDataIndex !== -1) {
            setData(mySetData[existingDataIndex]);
            setIsNew(false);
        }
        return(()=>{
            reset();
        })



    }, []);

    return (
        <IonPage>
            <IonContent fullscreen>
                <Header back del={!isNew} />
                {/* 삭제 모달 */}
                {!isNew ?
                    <IonModal id="modal" ref={modal} trigger="trash">
                        <div className="wrapper">
                            <p className="modalText">삭제하시겠습니까?</p>
                            <Button className="main" size={'small'} text={'확인'} onClick={() => handleDelete(id)}></Button>
                        </div>
                    </IonModal>
                    : null
                }
                <Container>
                    <article className="settingContainer">
                        <section className="titleInputBox">
                            <p>운동 종목 입력</p>
                            <input placeholder='입력해주세요.' value={data.name} onChange={(e: any) => setIndex(e.target.value, "name")} />
                        </section>
                        <section className="contentBox">
                            {/* <div className="leftBox">
                                <div className="progressBox">
                                    <Bar />
                                    {dotData.map((obj: DotPropsType, index: number) => (
                                        <Dot position={obj.position} color={obj.color} key={index} />
                                    ))}
                                </div>
                            </div> */}
                            <p>세트 수 설정</p>
                            <Button id={"set"} className={'setting'} size={'medium'} text={setInfo[data.set]} onClick={() => { }} />
                            {/* 세트 수 모달 */}
                            <IonModal id="modal" ref={modal} trigger="set">
                                <div className="wrapper">
                                    <Swiper index={data.set} setIndex={(i: number) => setIndex(i, "set")} data={setInfo} />
                                </div>
                            </IonModal>
                            <p>세트 간 휴식 시간</p>
                            <Button id={"rest"} className={'setting'} size={'medium'} text={restInfo[data.setBreakTime]} onClick={() => { }} disabled={data.set == 0} />
                            <IonModal id="modal" ref={modal} trigger="rest">
                                <div className="wrapper">
                                    <Swiper index={data.setBreakTime} setIndex={(i: number) => setIndex(i, "setBreakTime")} data={restInfo} />
                                </div>
                            </IonModal>
                            {/* 구분선 */}
                            <div className="line"></div>
                            <p>반복 횟수</p>
                            <Button id={"repeat"} className={'setting'} size={'medium'} text={repeatInfo[data.repeat]} onClick={() => { }} />
                            <IonModal id="modal" ref={modal} trigger="repeat">
                                <div className="wrapper">
                                    <Swiper index={data.repeat} setIndex={(i: number) => setIndex(i, "repeat")} data={repeatInfo} />
                                </div>
                            </IonModal>
                            {data.repeatList.map((obj: any, index: number) => (
                                <div key={index}>
                                    <p>{obj.name}</p>
                                    <Button id={`repeatList${index}`} className={'setting'} size={'medium'} text={repeatSecInfo[obj.index]} onClick={() => { }} />
                                    <IonModal id="modal" ref={modal} trigger={`repeatList${index}`}>
                                        <div className="wrapper">
                                            <input className="repeatListInput" value={obj.name} onChange={(e: any) => setDataOfRepeatList(index, e.target.value, "name")} placeholder="알림 이름 입력" />
                                            <Swiper index={obj.index} setIndex={(ti: number) => setDataOfRepeatList(index, ti, "index")} data={repeatSecInfo} />
                                        </div>
                                    </IonModal>
                                </div>
                            ))}

                        </section>
                        <section className="bottomBox">
                            {isRecommand ? null :
                                <Button className={'main'} size={'large'} text={'계속'} onClick={() => { history.push('/save') }} disabled={data.name === ""} />
                            }
                        </section>
                    </article>
                </Container>
                <button onClick={() => history.push(`/timer/${id ?? "test"}`)} className="floatingButton ion-activatable ripple-parent">
                    <IonIcon icon={caretForward} style={{ fontSize: "32px" }}></IonIcon>
                    <IonRippleEffect></IonRippleEffect>
                </button>
            </IonContent>
        </IonPage>
    )
}
