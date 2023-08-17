import { IonAlert, IonButton, IonText, useIonAlert } from "@ionic/react";
import OrderSummary from "./OrderSummary";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useRef, useState } from "react";
import { OPEN_CARD, OPEN_CONTACT } from "../utils/constants";

interface Alert {
  show: boolean;
  message?: string;
  key?: string;
}

const initialAlertState = {
  show: false,
};

const CheckoutComponent: React.FC<{
  handleModal: (key?: string) => void;
}> = ({ handleModal }) => {
  const { hasCard, hasContact } = useSelector(
    (state: RootState) => state.checkout
  );
  const [showAlert, setShowAlert] = useState<Alert>(initialAlertState);

  const handleClick = () => {
    if (!hasCard || !hasContact) {
      const key = !hasContact ? OPEN_CONTACT : OPEN_CARD;
      const message = `Please add ${!hasContact ? "contact" : "card"} details`;

      setShowAlert({
        show: true,
        key,
        message,
      });
    } else {
      console.log("Good to go!");
    }
  };

  const handleDismiss = () => {
    if (showAlert.key) {
      handleModal(showAlert.key);
    }
    setShowAlert(initialAlertState);
  };

  return (
    <div className="w-[95%] max-w-[920px] py-2  mx-auto">
      <IonAlert
        isOpen={showAlert.show !== false}
        onDidDismiss={handleDismiss}
        header="There was an error"
        subHeader={"Some details are missing!"}
        message={showAlert.message}
        buttons={["OK"]}
      />
      {/* <IonAlert
        isOpen={showAlert.show !== false}
        onDidDismiss={handleDismiss}
        header="There was an error"
        subHeader={"Some details are missing!"}
        message={showAlert.message}
        buttons={["Continue shoping"]}
      /> */}

      <OrderSummary />
      <IonButton
        fill="solid"
        expand="block"
        type="submit"
        color={hasCard && hasContact ? "success" : "medium"}
        onClick={handleClick}
        className="relative gap-4 rounded-sm px-0 mx-0 my-5 w-full min-w-[MAX(33%,250px)] md:max-w-[36%] lg:min-w-fit  lg:max-w-[380px]"
      >
        <IonText className="flex p-0 px-4 m-0 py-2 normal-case">
          Buy now
        </IonText>
      </IonButton>
    </div>
  );
};

export default CheckoutComponent;
