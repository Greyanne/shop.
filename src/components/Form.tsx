import {
  IonButton,
  IonIcon,
  IonInput,
  IonRippleEffect,
  IonRow,
  IonText,
} from "@ionic/react";
import { arrowDown, arrowForward } from "ionicons/icons";
import { useRef, useState } from "react";
import {
  Card,
  UserDetails,
  addCardDetails,
  addUserDetails,
} from "../redux/features/checkout/checkoutSlice";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormHeader from "./FormHeader";

const CONTACT = "CONTACT";
const CARD = "CARD";

const TOGGLE = {
  CONTACT,
  CARD,
};

const initialCardState = {
  cvv: "",
  expiryMonth: "",
  expiryYear: "",
  cardNumber: "",
};

const initialUserState = {
  name: "",
  email: "",
  phone: "",
  address: {
    city: "",
    country: "",
  },
};

const Form = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>(initialUserState);
  const [cardDetails, setCardDetails] = useState<Card>(initialCardState);
  const dispatch = useDispatch<AppDispatch>();
  const [toggleContact, setToggleContect] = useState(true);
  const [toggleCard, setToggleCard] = useState(false);

  const handleToggle = (toggle: typeof CONTACT | typeof CARD) => {
    if (toggle === CONTACT) {
      setToggleContect(!toggleContact);
    }
    if (toggle === CARD) {
      setToggleCard(!toggleCard);
    }
  };

  const { handleBlur, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      ...initialUserState,
      ...initialCardState,
    },

    validationSchema: Yup.object({
      name: Yup.string(),
      email: Yup.string()
        .email("Please enter a valid email")
        .required("Please enter email"),
      cvv: Yup.string(),
    }),

    onSubmit: (values) => {},
  });

  const onCardInput = (ev: Event) => {
    const input = ev.target as HTMLIonInputElement;
    const value = input.value as string;
    const name = input.name as keyof Card;

    // Removes non alphanumeric characters
    const filteredValue = value.replace(/[^a-zA-Z0-9]+/g, "");

    setCardDetails((prev) => ({
      ...prev,
      [name]: filteredValue,
    }));
  };

  const onInput = (ev: Event) => {
    const input = ev.target as HTMLIonInputElement;
    const value = input.value as string;
    const name = input.name as string; //keyof UserState;

    // Removes non alphanumeric characters
    const filteredValue = value.replace(/[^a-zA-Z0-9@-_.]+/g, "");

    switch (name) {
      case "city":
      case "country":
        const detail = name as keyof typeof userDetails.address;
        setUserDetails((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            [detail]: filteredValue,
          },
        }));
        break;

      default:
        setUserDetails((prev) => ({
          ...prev,
          [name]: filteredValue,
        }));
        break;
    }
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement | HTMLIonButtonElement>
  ) => {
    e.preventDefault();
    console.log("details:: ", cardDetails);
    dispatch(addUserDetails(userDetails));
    dispatch(addCardDetails(cardDetails));

    console.log({ cardDetails, userDetails });
  };

  return (
    <div className="grid items-center">
      <form
        className="grid gap-8 md:grid-cols-2 items-baseline w-[95%] pt-5 mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="w-full grid gap-4 py-5">
          <FormHeader
            title={"Contact Details"}
            isActive={toggleContact}
            toggle={() => handleToggle(CONTACT)}
          />

          <IonRow className="border w-full px-2 rounded-xl  mx-auto">
            <IonInput
              name="name"
              clearInput={true}
              placeholder="Fullname"
              value={userDetails.name}
              onIonInput={onInput}
              label="Fullname"
              type="text"
              labelPlacement="stacked"
              required
            ></IonInput>
          </IonRow>
          <IonRow className="border w-full px-2 rounded-xl mx-auto">
            <IonInput
              name="email"
              clearInput={true}
              placeholder="user@example.com"
              value={userDetails.email}
              onIonInput={onInput}
              type="email"
              label="Email"
              labelPlacement="stacked"
              required
            ></IonInput>
          </IonRow>
          <IonRow className="border w-full px-2 rounded-xl mx-auto">
            <IonInput
              name="phone"
              clearInput={true}
              placeholder="Phone"
              value={userDetails.phone}
              onIonInput={onInput}
              type="tel"
              label="Phone"
              labelPlacement="stacked"
              required
            ></IonInput>
          </IonRow>
          <IonRow className="border w-full px-2 rounded-xl mx-auto">
            <IonInput
              clearInput={true}
              name="city"
              placeholder="City"
              value={userDetails?.address?.city}
              onIonInput={onInput}
              type="text"
              label="City/State"
              labelPlacement="stacked"
              required
            ></IonInput>
          </IonRow>
          <IonRow className="border w-full px-2 rounded-xl mx-auto">
            <IonInput
              clearInput={true}
              placeholder="Country"
              name="country"
              value={userDetails?.address?.country}
              onIonInput={onInput}
              type="text"
              label="Country"
              labelPlacement="stacked"
              required
            ></IonInput>
          </IonRow>
          <IonButton
            fill="solid"
            expand="block"
            type="submit"
            color={"medium"}
            className="gap-4 w-full rounded-sm p-0 mx-0"
          >
            <IonText className="flex p-0 px-4 m-0">Save</IonText>
            {/* <IonIcon
              size="small"
              icon={arrowForward}
              className="flex p-0 m-0"
            ></IonIcon> */}
            <IonRippleEffect></IonRippleEffect>
          </IonButton>
        </div>

        <div className="w-full grid gap-4 py-5 md:w-[70%]">
          <FormHeader
            title={"Card Details"}
            isActive={toggleCard}
            toggle={() => handleToggle(CARD)}
          />
          <IonRow className="border w-full px-2 rounded-xl  mx-auto">
            <IonInput
              name="cardNumber"
              clearInput={true}
              placeholder="Card Number"
              value={cardDetails.cardNumber}
              onIonInput={onCardInput}
              label="Card Number"
              type="number"
              labelPlacement="stacked"
              required
            ></IonInput>
          </IonRow>
          <IonRow className="border w-full px-2 rounded-xl mx-auto">
            <IonInput
              name="cvv"
              clearInput={true}
              placeholder="CVV"
              value={cardDetails.cvv}
              onIonInput={onCardInput}
              type="number"
              label="CVV"
              labelPlacement="stacked"
              required
            ></IonInput>
          </IonRow>
          <IonRow className="border w-full px-2 rounded-xl mx-auto">
            <IonInput
              name="expiryMonth"
              clearInput={true}
              placeholder="Expiry month"
              value={cardDetails.expiryMonth}
              onIonInput={onCardInput}
              type="number"
              maxlength={2}
              label="Expiry Month"
              labelPlacement="stacked"
              required
            ></IonInput>
          </IonRow>
          <IonRow className="border w-full px-2 rounded-xl mx-auto">
            <IonInput
              name="expiryYear"
              clearInput={true}
              placeholder="Expiry year"
              value={cardDetails.expiryYear}
              onIonInput={onCardInput}
              type="number"
              maxlength={4}
              label="Expiry year"
              labelPlacement="stacked"
              required
            ></IonInput>
          </IonRow>
        </div>

        <div className="flex w-full gap-2 justify-between">
          <IonButton
            fill="clear"
            expand="block"
            color={"medium"}
            className="ion-activatable relative gap-4 flex-1 ripple-parent p-0 rounded-rectangle mx-2 my-4 flex items-center justify-between rounded-lg normal-case h-12 font-medium tracking-tight"
          >
            <IonText>Cancel</IonText>
            <IonRippleEffect></IonRippleEffect>
          </IonButton>
          <IonButton
            fill="clear"
            expand="block"
            type="submit"
            color={"medium"}
            className="ion-activatable relative gap-4 flex-1 ripple-parent p-0 rounded-rectangle mx-2 my-4 flex items-center justify-between rounded-lg normal-case h-12 font-medium tracking-tight"
          >
            <IonText className="flex p-0 m-0 w-full">Proceed</IonText>
            <IonIcon
              size="small"
              icon={arrowForward}
              className="flex p-0 m-0"
            ></IonIcon>
            <IonRippleEffect></IonRippleEffect>
          </IonButton>
        </div>
      </form>
    </div>
  );
};

export default Form;
