import { IonButton, IonContent, IonModal, IonText } from "@ionic/react";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../redux/store";
import {
  addContactDetails,
  removeContactDetails,
} from "../redux/features/checkout/checkoutSlice";
import FormHeader from "./FormHeader";
import { useState } from "react";
import CustomInput from "./CustomInput";
import { ContactDetails } from "../types";

const ContactFormValidation = Yup.object().shape({
  name: Yup.string().required("Enter fullname"),
  email: Yup.string().email("Enter a valid email").required("Enter email"),
  phone: Yup.number().required("Enter phone number"),
  address: Yup.object()
    .default(null)
    .nullable()
    .shape({
      city: Yup.string().required("Enter delivery city"),
      country: Yup.string().required("Enter delivery country"),
    }),
});

const ContactForm = () => {
  const { contact, hasContact } = useSelector(
    (state: RootState) => state.checkout
  );

  const dispatch = useDispatch<AppDispatch>();
  const [toggle, setToggle] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const handleRemoveContactDetails = (resetForm: any) => {
    dispatch(removeContactDetails());
    resetForm();
    setIsSaved(false);
  };
  const handleSubmit = (values: ContactDetails) => {
    dispatch(addContactDetails(values));
    setIsSaved(true);
  };

  const handleIsSaved = () => {
    setIsSaved(false);
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <IonContent className="ion-padding">
      <IonModal
        trigger="open-contact"
        initialBreakpoint={0.75}
        breakpoints={[0, 0.25, 0.75, 0.9]}
        handleBehavior="cycle"
      >
        <IonContent className="ion-padding">
          <Formik
            initialValues={contact}
            validationSchema={ContactFormValidation}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form className="grid items-baseline w-[95%] py-2 mx-auto">
                <FormHeader
                  title={"Contact Details"}
                  icon={false}
                  isActive={toggle}
                  toggle={handleToggle}
                />
                <div className={`w-full grid gap-4 py-5`}>
                  <CustomInput
                    handleIsSaved={handleIsSaved}
                    id="name"
                    name="name"
                    placeholder="Fullname"
                    label="Fullname"
                  />
                  <CustomInput
                    handleIsSaved={handleIsSaved}
                    id="email"
                    name="email"
                    placeholder="Email"
                    label="Email"
                    inputMode="text"
                    type="email"
                  />
                  <CustomInput
                    handleIsSaved={handleIsSaved}
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    label="Phone"
                    inputMode="tel"
                  />
                  <CustomInput
                    handleIsSaved={handleIsSaved}
                    id="city"
                    name="address.city"
                    placeholder="City/State"
                    label="City/State"
                  />
                  <CustomInput
                    handleIsSaved={handleIsSaved}
                    id="country"
                    name="address.country"
                    placeholder="Country"
                    label="Country"
                  />

                  <IonButton
                    fill="solid"
                    expand="block"
                    type="submit"
                    color={"medium"}
                    disabled={isSaved}
                    className="relative tracking-tight h-12 leading-10 gap-4 w-full rounded-sm px-2 mx-0 normal-case"
                  >
                    {isSaved ? "Saved" : "Save"}
                  </IonButton>

                  {hasContact && (
                    <IonButton
                      fill="solid"
                      expand="block"
                      onClick={() =>
                        handleRemoveContactDetails(formik.resetForm)
                      }
                      color={"medium"}
                      className="relative tracking-tight h-12 leading-10 gap-4 w-full rounded-sm px-2 mx-0 normal-case"
                    >
                      Remove contact details
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

export default ContactForm;
