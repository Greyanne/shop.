import { IonButton, IonIcon, IonRippleEffect, IonText } from "@ionic/react";

import ContactForm from "./ContactForm";
import CardForm from "./CardForm";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { arrowForward } from "ionicons/icons";

const Form = () => {
  const { hasCard, hasContact } = useSelector(
    (state: RootState) => state.checkout
  );

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement | HTMLIonButtonElement>
  ) => {
    e.preventDefault();
  };

  return (
    <div className="grid md:grid-cols-2  gap-4 flex-wrap max-w-[920px] mx-auto">
      <ContactForm />
      <CardForm />
      {hasCard && hasContact && (
        <IonButton
          fill="solid"
          expand="block"
          color="medium"
          className="relative gap-4 w-full rounded-sm p-0 mx-0"
        >
          <IonText className="flex p-0 px-4 m-0">Proceed to Checkout</IonText>
        </IonButton>
      )}
    </div>
  );
};

export default Form;
