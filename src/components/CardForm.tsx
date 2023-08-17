import React, { useEffect, useRef, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  createAnimation,
} from "@ionic/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "./CustomInput";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import FormHeader from "./FormHeader";
import {
  addCardDetails,
  removeCardDetails,
} from "../redux/features/checkout/checkoutSlice";
import { CardDetails } from "../types";

const CardValidationSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .matches(/^\d{16}$/, "Invalid card number") // Matches 16 digits
    .required("Card number is required"),

  expirationDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiration date") // MM/YY format
    .required("Expiration date is required"),

  cvv: Yup.string()
    .matches(/^\d{3,4}$/, "Invalid CVV") // 3 or 4 digits
    .required("CVV is required"),

  cardHolderName: Yup.string().required("Card holder name is required"),
});

const CardForm = () => {
  const { card, hasContact, hasCard } = useSelector(
    (state: RootState) => state.checkout
  );
  const dispatch = useDispatch<AppDispatch>();
  const [isSaved, setIsSaved] = useState(false);
  const [toggle, setToggle] = useState(true);

  const handleRemoveCardDetails = (resetform: any) => {
    dispatch(removeCardDetails());
    resetform();
    setIsSaved(false);
  };

  const handleSubmit = (values: CardDetails) => {
    console.log(values);
    dispatch(addCardDetails(values));
    setIsSaved(true);
  };

  const handleIsSaved = () => {
    setIsSaved(false);
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    if (hasContact) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }, [hasContact]);

  return (
    <IonContent className="ion-padding">
      <IonModal
        trigger="open-card"
        initialBreakpoint={0.75}
        breakpoints={[0, 0.25, 0.75]}
        handleBehavior="cycle"
      >
        <IonContent className="ion-padding mx-auto">
          <Formik
            initialValues={card}
            validationSchema={CardValidationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form className="grid items-baseline w-[95%] py-2 mx-auto md:max-w-[380px]">
                <FormHeader
                  title={"Card Details"}
                  icon={false}
                  isDisabled={!hasContact}
                  isActive={toggle}
                  toggle={handleToggle}
                />
                <div className={`w-full grid gap-4 py-5`}>
                  <CustomInput
                    handleIsSaved={handleIsSaved}
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="Card Number"
                    label="Card Number"
                    counter={true}
                    maxlength={16}
                  />
                  <CustomInput
                    handleIsSaved={handleIsSaved}
                    id="cardHolderName"
                    name="cardHolderName"
                    placeholder="Card Holder Name"
                    label="Card Holder Name"
                  />
                  <CustomInput
                    handleIsSaved={handleIsSaved}
                    id="expirationDate"
                    name="expirationDate"
                    placeholder="Expiration Date"
                    label="Expiration Date"
                  />
                  <CustomInput
                    handleIsSaved={handleIsSaved}
                    id="cvv"
                    name="cvv"
                    placeholder="CVV"
                    label="CVV"
                    type="number"
                  />

                  <IonButton
                    fill="solid"
                    expand="block"
                    type="submit"
                    color="medium"
                    disabled={isSaved}
                    className="relative tracking-tight h-12 leading-10 gap-4 w-full rounded-sm px-2 mx-0 normal-case"
                  >
                    {hasCard && isSaved ? "Saved" : "Save"}
                  </IonButton>

                  {hasCard && (
                    <IonButton
                      fill="outline"
                      expand="block"
                      onClick={() => handleRemoveCardDetails(formik.resetForm)}
                      color={"medium"}
                      className="relative tracking-tight h-12 leading-10 gap-4 w-full rounded-sm px-2 mx-0 normal-case"
                    >
                      Remove card
                    </IonButton>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </IonContent>
      </IonModal>
    </IonContent>
  );
};

export default CardForm;
