import { IonInput, IonRow } from "@ionic/react";
import React from "react";

type InputType = typeof LocalJSX.IonInput;

interface Props extends IonInputAttributes {}

const FormInput: React.FC<Props> = ({ ...props }) => {
  return (
    <IonRow className="border w-full px-2 rounded-xl  mx-auto">
      <IonInput
        name="name"
        clearInput={true}
        placeholder="Fullname"
        value={props.value}
        onIonInput={props}
        label="Fullname"
        type="text"
        labelPlacement="stacked"
        required
      ></IonInput>
    </IonRow>
  );
};

export default FormInput;
