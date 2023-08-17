import { IonButton, IonIcon, IonText } from "@ionic/react";
import { checkmark } from "ionicons/icons";

interface Props {
  id: string;
  title: string;
  isActive?: boolean;
  isDisabled?: boolean;
  toggle?: () => void;
}

const CheckoutToggle: React.FC<Props> = ({ title, id }) => {
  return (
    <IonButton id={id} onClick={e=>e.preventDefault()} expand="block" className="flex justify-between">
      <IonText>{title}</IonText>
      <IonIcon size="small" icon={checkmark} className="flex p-0 m-0"></IonIcon>
    </IonButton>
  );
};

export default CheckoutToggle;
