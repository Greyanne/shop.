import { IonIcon } from "@ionic/react";
import { arrowDown, arrowUp } from "ionicons/icons";
import React from "react";

interface Props {
  title: string;
  isActive?: boolean;
  isDisabled?: boolean;
  toggle?: () => void;
}

const FormHeader: React.FC<Props> = ({
  title,
  toggle,
  isDisabled,
  isActive,
}) => {
  return (
    <div onClick={toggle} className="w-full flex justify-between py-3 px-1 cursor-pointer">
      <h1 className="">{title}</h1>
      <IonIcon
        size="small"
        icon={isDisabled || isActive ? arrowDown : arrowUp}
        className="flex p-0 m-0"
      ></IonIcon>
    </div>
  );
};

export default FormHeader;
