import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { Header } from '../../components/Header';
import ExploreContainer from '../../components/ExploreContainer';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <Header back run />
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
