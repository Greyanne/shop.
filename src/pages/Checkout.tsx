import {
  IonAlert,
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import ContactForm from "../components/ContactForm";
import CardForm from "../components/CardForm";
import { useEffect, useRef, useState } from "react";
import { OPEN_CARD, OPEN_CONTACT } from "../utils/constants";
import FormHeader from "../components/FormHeader";
import SuccessContainer from "../components/SuccessContainer";
import OrderSummary from "../components/OrderSummary";
import { Alert } from "../types";
import EmptyCart from "../components/EmptyCart";
import { checkout } from "../redux/features/cart/cartSlice";

const initialAlertState = {
  show: false,
};

const Checkout: React.FC = () => {
  const { hasCard, hasContact, contact } = useSelector(
    (state: RootState) => state.checkout
  );
  const dispatch = useDispatch<AppDispatch>();
  const { count, products } = useSelector((state: RootState) => state.cart);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);
  const [showAlert, setShowAlert] = useState<Alert>(initialAlertState);

  const handleBuy = () => {
    if (!hasCard || !hasContact) {
      const key = !hasContact ? OPEN_CONTACT : OPEN_CARD;
      const message = `Please add ${!hasContact ? "contact" : "card"} details`;
      setShowAlert({
        show: true,
        key,
        message,
      });
    } else {
      handleModal();
      //adding checkout call here to give a sense of async call
      dispatch(checkout({ products, contact }));

      console.log("Good to go!");
    }
  };

  const handleDismiss = () => {
    handleModal(showAlert.key);
    setShowAlert(initialAlertState);
  };

  const handleModal = (key?: string) => {
    switch (key) {
      case OPEN_CONTACT:
        return contactRef.current?.click();
      case OPEN_CARD:
        return cardRef.current?.click();
      default:
        return successRef.current?.click();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{`Cart | Checkout`}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{`Cart | Checkout`}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div id="open-success" ref={successRef}></div>

        {count > 0 ? (
          <>
            <div className="min-w-[MAX(33%,250px)]  w-full md:max-w-[36%] lg:min-w-fit  lg:max-w-[380px] max-w-[95%] mx-auto">
              <div className="flex flex-col gap-4 max-w-[920px] mx-auto px-2">
                <div
                  id="open-contact"
                  className="max-w-[920px]"
                  ref={contactRef}
                >
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

                <div className="w-[95%] max-w-[920px] py-2  mx-auto">
                  <IonAlert
                    isOpen={showAlert.show !== false}
                    onDidDismiss={handleDismiss}
                    header="There was an error"
                    subHeader={"Some details are missing!"}
                    message={showAlert.message}
                    buttons={["OK"]}
                  />

                  <>
                    <OrderSummary />
                    <IonButton
                      fill="solid"
                      expand="block"
                      type="submit"
                      color={hasCard && hasContact ? "success" : "medium"}
                      onClick={handleBuy}
                      className="relative normal-case tracking-tight h-12 leading-10 gap-4 rounded-sm px-0 mx-0 my-5 w-full min-w-[MAX(33%,250px)] md:max-w-[36%] lg:min-w-fit  lg:max-w-[380px]"
                    >
                      Buy now
                    </IonButton>
                  </>
                </div>
              </div>
            </div>
          </>
        ) : (
          <EmptyCart />
        )}

        {/* Modals */}
        <ContactForm />
        <CardForm />
        <SuccessContainer />
      </IonContent>
    </IonPage>
  );
};

export default Checkout;
