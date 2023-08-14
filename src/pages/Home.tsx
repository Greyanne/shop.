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
        <IonHeader collapse="condense" translucent className="py-0 my-10 mb-5">
          <IonToolbar>
            <IonTitle size="large" className="break-words">
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
