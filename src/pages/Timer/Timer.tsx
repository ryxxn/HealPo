import React, { useEffect, useState } from 'react'
import "./Timer.scss"
import { IonContent, IonIcon, IonPage } from '@ionic/react'
import { Header } from '../../components/Header'
import { Container } from '../../components/Container'
import { MySetType, useSettingStore } from '../../store/store'
import { useParams } from 'react-router'
import { deepcopy, getLocalData } from '../../util'
import { ProgressCircle } from '../../components/ProgressCircle'
import { caretForward, pause } from 'ionicons/icons'
import { recommandData } from '../Home/Home'

type timerParams = { id: string };

export const Timer: React.FC = () => {

  const { data } = useSettingStore();

  const { id: id } = useParams<timerParams>();

  const [timerData, setTimerData] = useState(data);


  const [repeatIndex, setRepeatIndex] = useState<number>(0);
  const [currentSetCount, setCurrentSetCount] = useState<number>(0);
  const [currentRepsCount, setCurrentRepsCount] = useState<number>(0);

  // 타이머 설정
  const [fullTime, setFullTime] = useState<number>(0);
  const [count, setCount] = useState(fullTime * 100);
  const [isStop, setIsStop] = useState<boolean>(true);

  const playSound = () => {
    const audio = new Audio('/assets/beep.mp3');
    audio.play();
  }

  // 세트 데이터 가져오기
  useEffect(() => {
    // 신규 생성 중 테스트인 경우
    if (id === "test") {
      setTimerData(deepcopy(data));
      setFullTime(data.repeatList[0].index + 1)
      setCount((data.repeatList[0].index + 1) * 100)
      return;
    }
    // 추천 운동인 경우
    if(id.includes("recommand")){
      const tmp = deepcopy(recommandData);
      const index = tmp.findIndex((obj: any) => obj.id === id)
      setTimerData(tmp[index]);
      setFullTime(tmp[index].repeatList[0].index + 1)
      setCount((tmp[index].repeatList[0].index + 1) * 100)
      return;
    }
    // 기존 데이터인 경우
    const tmp = getLocalData("mySetData")
    const index = tmp.findIndex((obj: any) => obj.id === id)
    setTimerData(tmp[index]);
    setFullTime(tmp[index].repeatList[0].index + 1)
    setCount((tmp[index].repeatList[0].index + 1) * 100)

  }, []);

  useEffect(() => {
    let intervalId: any = null;

    if (!isStop && (currentSetCount <= timerData.set)) {
      intervalId = setInterval(() => {
        if (count <= 0) {
          // // 1초 후 진행
          // // 딜레이 후 추가 작업 수행
          // clearInterval(intervalId); // 타이머 중지
          // console.log("삑!")
          // setTimeout(() => {
          playSound();
          // 한 세트 끝나면
          if ((currentRepsCount === timerData.repeat) && (repeatIndex === timerData.repeatList.length - 1)) {
            setRepeatIndex(0);
            setFullTime(timerData.repeatList[0].index + 1);
            setCount((timerData.repeatList[0].index + 1) * 100)
            setCurrentRepsCount(0);
            setCurrentSetCount(currentSetCount + 1);
          }
          else {
            if (repeatIndex === timerData.repeatList.length - 1) {
              setFullTime(timerData.repeatList[0].index + 1);
              setCount((timerData.repeatList[0].index + 1) * 100)
              setRepeatIndex(0);
              setCurrentRepsCount(currentRepsCount + 1);
            }
            else {
              setRepeatIndex(repeatIndex + 1);
              setFullTime(timerData.repeatList[repeatIndex + 1].index + 1);
              setCount((timerData.repeatList[repeatIndex + 1].index + 1) * 100);
            }
          }
          // }, 1000);
        }
        else {
          setCount(prevCount => prevCount - 10);
        }
      }, 100);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isStop, count]);



  return (
    <IonPage>
      <IonContent fullscreen>
        <Header back />
        <Container>
          <article className="timerContainer">
            {/* <section className="title">{timerData.name}</section> */}
            <section className="currentInfo">
              <div>
                <p style={{ fontSize: "16px", color: "black" }}>Set</p>
                <p>{`${currentSetCount > timerData.set ? currentSetCount : currentSetCount + 1} / ${timerData.set + 1}`}</p>
              </div>
              <div>
                <p style={{ fontSize: "16px", color: "black" }}>Reps</p>
                <p>{`${currentRepsCount + 1} / ${timerData.repeat + 1}`}</p>
              </div>
            </section>
            <p>{timerData.repeatList[repeatIndex].name}</p>
            <section className="progressCircle">
              <ProgressCircle deg={360 - (count / (fullTime * 100) * 360)} time={count === fullTime * 100 ? Math.floor(count / 100) : Math.floor(count / 100) + 1} />
            </section>
            <section className="bottomBox">
              <button className={`startButton ${isStop ? "stop" : ""}`} onClick={() => setIsStop(!isStop)}>
                {isStop ?
                  <IonIcon icon={caretForward} />
                  :
                  <IonIcon icon={pause} />
                }
              </button>
            </section>
          </article>
        </Container>
      </IonContent>
    </IonPage>)
}
