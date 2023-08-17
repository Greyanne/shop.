import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ProductsContainer from "../components/ProductsContainer";
import { getGreeting } from "../utils/greeting";



const Home: React.FC = () => {
  return (
    <IonPage className="max-w-[1440px] mx-auto">
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>{getGreeting()}, welcome</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent fullscreen className="px-2">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              {getGreeting()}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <ProductsContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
