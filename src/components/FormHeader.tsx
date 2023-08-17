import { IonButton, IonIcon, IonText } from "@ionic/react";
import {
  arrowDown,
  arrowUp,
  checkmark,
  checkmarkDoneCircle,
  ellipseOutline,
} from "ionicons/icons";
import React from "react";

interface Props {
  title: string;
  icon?: boolean;
  variant?: boolean;
  isActive?: boolean;
  isDisabled?: boolean;
  toggle?: () => void;
}

const FormHeader: React.FC<Props> = ({ title, icon = true, variant }) => {
  return (
    <div
      className={`${
        !icon ? "justify-center" : "justify-between"
      } flex items-center p-3 border-b `}
    >
      <IonText>{title}</IonText>
      {icon && (
        <IonIcon
          size="small"
          slot="start"
          color={variant ? "success" : "medium"}
          icon={variant ? checkmarkDoneCircle : ellipseOutline}
          className="flex p-0 m-0"
        ></IonIcon>
      )}
    </div>
  );
};

export default FormHeader;
