import {
  IonButton,
  IonInput,
  IonRippleEffect,
  IonRow,
  IonText,
} from "@ionic/react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../redux/store";
import { ContactDetails, addContactDetails } from "../redux/features/checkout/checkoutSlice";

const initialContactState = {
  name: "",
  email: "",
  phone: "",
  address: {
    city: "",
    country: "",
  },
};

const ContactForm = () => {
  const contactDetails = useSelector((state: RootState) => state.checkout.contact);
  const dispatch = useDispatch<AppDispatch>()

  const { handleBlur, handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      ...contactDetails,
    },

    validationSchema: Yup.object({
      name: Yup.string().required(),
      email: Yup.string()
        .email("Please enter a valid email")
        .required("Please enter email"),
      phone: Yup.number(),
      address: Yup.object().default(null).nullable().shape({
        city: Yup.string().required(),
        country: Yup.string().required(),
      }),
    }),

    onSubmit: (values: ContactDetails) => {
        dispatch(addContactDetails(values));
    },
  });
  return (
    <form
      className="grid gap-8 md:grid-cols-2 items-baseline w-[95%] pt-5 mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="w-full grid gap-4 py-5">
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
    </form>
  );
};

export default ContactForm;
