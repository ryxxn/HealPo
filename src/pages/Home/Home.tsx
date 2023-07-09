import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.scss';
import { Header } from '../../components/Header';
import { Container } from '../../components/Container';
import { Card } from '../../components/Card';
import { useEffect } from 'react';
import { getLocalData } from '../../util';
import { MySetType, useSettingStore } from '../../store/store';

export const recommandData: MySetType[] = [
  { name: "5 X 5 세트", iconNum: 11, id: "recommand_a", set: 4, setBreakTime: 0, repeat: 4, repeatList: [{ name: "DOWN", index: 3 }, { name: "UP", index: 1 }] },
  { name: "Interval Training", iconNum: 4, id: "recommand_b", set: 4, setBreakTime: 0, repeat: 4, repeatList: [{ name: "DOWN", index: 3 }, { name: "UP", index: 1 }] },
  { name: "10 X 10 세트", iconNum: 3, id: "recommand_c", set: 9, setBreakTime: 0, repeat: 9, repeatList: [{ name: "DOWN", index: 3 }, { name: "UP", index: 1 }] },
  { name: "GVT Program", iconNum: 4, id: "recommand_d", set: 4, setBreakTime: 0, repeat: 4, repeatList: [{ name: "DOWN", index: 3 }, { name: "UP", index: 1 }] }];

export const Home: React.FC = () => {

  const { totalData, fetchData, reset } = useSettingStore();

  useEffect(() => {
    fetchData();
    reset();
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <Header title />
        <Container bgColor>
          <article className="homeContainer">
            <section className="setCardBox">
              <h1>헬뽀 추천 세트</h1>
              <div className="cardBox">
                {recommandData.map((obj: MySetType) => (
                  <Card name={obj.name} iconNum={obj.iconNum} id={obj.id} key={obj.id} />
                ))}
              </div>
            </section>
            <section className="setCardBox">
              <h1>내 운동 세트</h1>
              <div className="cardBox">
                {totalData.map((obj: MySetType) => (
                  <Card name={obj.name} iconNum={obj.iconNum} id={obj.id} key={obj.id} />
                ))}
                <Card name="add" iconNum={0} id="" />
              </div>
            </section>
          </article>
        </Container>
      </IonContent>
    </IonPage>
  );
};

