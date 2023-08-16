import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Cart.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Form from "../components/Form";

const Checkout: React.FC = () => {
  const cartCount = useSelector((state: RootState) => state.cart.count);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cart</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Checkout</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="max-w-[95%] mx-auto">
          <Form/>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Checkout;
