import React from "react";
import { IonInput, IonNote, IonRow, IonText } from "@ionic/react";
import { useField, useFormikContext } from "formik"; // Import Formik dependencies

interface InputProps
  extends React.HTMLAttributes<HTMLIonInputElement>{
  name: string;
  label: string;
  type?: any;
  handleIsSaved: any;
  counter?: boolean;
  maxlength?: number;
}

const CustomInput: React.FC<InputProps> = ({
  name,
  label,
  placeholder,
  inputMode = "text",
  type = "text",
  handleIsSaved,
  counter,
  maxlength,
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <>
      <IonRow className="px-2 w-full rounded-xl mx-auto">
        <IonInput
          {...field}
          name={name}
          placeholder={placeholder}
          clearInput={true}
          inputMode={inputMode}
          fill="outline"
          type={type}
          label={label}
          labelPlacement="stacked"
          onIonInput={(e) => {
            setFieldValue(name, e.detail.value as string);
            handleIsSaved();
          }}
          value={field.value as string}
          onIonBlur={field.onBlur}
          color={meta.touched && meta.error ? "danger" : undefined}
          counter={counter}
          maxlength={maxlength}
        ></IonInput>

        {meta.touched && meta.error && (
          <IonNote
            color="danger"
            className="text-xs py-1"
          >{`${meta.error}`}</IonNote>
        )}
      </IonRow>
    </>
  );
};

export default CustomInput;
