import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';


const Wishlist: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Wishlist</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Wishlist</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Coming soon" />
        <h1 className="text-center m-auto"></h1>
      </IonContent>
    </IonPage>
  );
};

export default Wishlist;
