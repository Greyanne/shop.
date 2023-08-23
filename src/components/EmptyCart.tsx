import { IonButton, IonIcon } from "@ionic/react";
import "./ExploreContainer.css";
import { cartOutline } from "ionicons/icons";

const EmptyCart: React.FC = () => {
  return (
    <div className="container mx-auto">
      <IonIcon icon={cartOutline} color="medium" className="text-8xl"/>
      <p>
       You have no item in your cart
      </p>
      <IonButton href="/" color="medium" className="my-5 normal-case text-sm h-12 rounded-lg tracking-normal">Start shopping now</IonButton>
    </div>
  );
};

export default EmptyCart;
