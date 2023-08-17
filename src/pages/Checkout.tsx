import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  createAnimation,
} from "@ionic/react";
import "./Cart.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CheckoutComponent from "../components/CheckoutComponent";
import ContactForm from "../components/ContactForm";
import CardForm from "../components/CardForm";
import { useRef } from "react";
import { OPEN_CARD, OPEN_CONTACT } from "../utils/constants";
import FormHeader from "../components/FormHeader";
import SuccessContainer from "../components/SuccessContainer";

const Checkout: React.FC = () => {
  const { hasCard, hasContact } = useSelector(
    (state: RootState) => state.checkout
  );
  const contactRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleModal = (key?: string) => {
    if (!key) {
      return;
    } else {
      if (key === OPEN_CONTACT) {
        contactRef.current?.click();
      }
      if (key === OPEN_CARD) {
        cardRef.current?.click();
      }
    }
  };
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

        <div className="min-w-[MAX(33%,250px)]  w-full md:max-w-[36%] lg:min-w-fit  lg:max-w-[380px] max-w-[95%] mx-auto">
          <div className="flex flex-col gap-4 max-w-[920px] mx-auto px-2">
            <div id="open-contact" className="max-w-[920px]" ref={contactRef}>
              <FormHeader
                title={"Contact Details"}
                variant={hasContact}
                isDisabled={!hasContact}
                isActive={false}
              />
            </div>
            <div id="open-card" className="max-w-[920px]" ref={cardRef}>
              <FormHeader
                title={"Card Details"}
                variant={hasCard}
                isDisabled={!hasContact}
                isActive={false}
              />
            </div>

            <ContactForm />
            <CardForm />
            <CheckoutComponent handleModal={handleModal} />
          </div>
        </div>

        <SuccessContainer/>
      </IonContent>
    </IonPage>
  );
};

export default Checkout;
