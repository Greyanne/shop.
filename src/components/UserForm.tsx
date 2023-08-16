import { IonButton, IonIcon, IonInput, IonRippleEffect, IonRow, IonText } from '@ionic/react';
import { arrowForward } from 'ionicons/icons';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { UserDetails, addUserDetails } from '../redux/features/checkout/checkoutSlice';

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: {
    city: "",
    country: "",
  },
};

const UserForm = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>(initialState);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement | HTMLIonButtonElement>
  ) => {
    e.preventDefault();
    console.log("details:: ", userDetails);
    dispatch(addUserDetails(userDetails));
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

  return (
    <div className="grid items-center">
      <form className="grid gap-3 w-[95%] pt-5 mx-auto" onSubmit={handleSubmit}>
        <h1 className="">Contact Details</h1>
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

        <div className="flex w-full gap-2 justify-between py-5">
          <IonButton
            fill="clear"
            expand="block"
            color={"medium"}
            className="mx-2 my-4 flex-1 items-center justify-between rounded-lg normal-case h-12 font-medium tracking-tight"
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
}

export default UserForm