import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.scss';
import { Header } from '../../components/Header';
import { Container } from '../../components/Container';
import { Card } from '../../components/Card';

type recommandDataType = {
  name: string,
  iconNum: number,
  id: string
}

const Home: React.FC = () => {

  const recommandData: recommandDataType[] = [{ name: "5 X 5 세트", iconNum: 11, id: "a" }, { name: "Interval Training", iconNum: 4, id: "b" }, { name: "10 X 10 세트", iconNum: 3, id: "c" }, { name: "GVT Program", iconNum: 4, id: "d" }];

  const mySetData: recommandDataType[] = [];

  return (
    <IonPage>
      <IonContent fullscreen>
        <Header title />
        <Container bgColor>
          <article className="homeContainer">
            <section className="setCardBox">
              <h1>헬뽀 추천 세트</h1>
              <div className="cardBox">
                {recommandData.map((obj: recommandDataType) => (
                  <Card name={obj.name} iconNum={obj.iconNum} id={obj.id} key={obj.id} />
                ))}
              </div>
            </section>
            <section className="setCardBox">
              <h1>내 운동 세트</h1>
              <div className="cardBox">
                {mySetData.map((obj: recommandDataType) => (
                  <Card name={obj.name} iconNum={obj.iconNum} id={obj.id} key={obj.id} />
                ))}
                <Card name="add" iconNum={0} id=""/>
              </div>
            </section>
          </article>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Home;
