import {
  IonContent,
  IonIcon,
  IonModal,
  IonText,
} from "@ionic/react";
import { checkmarkCircle } from "ionicons/icons";
import { Link, useHistory } from "react-router-dom";
import { useRef } from "react";

const SuccessContainer: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);

  const handleClose = () => {
    if (modal) {
      modal.current?.dismiss();
    }
    // history.replace("/");
  };

  return (
    <IonContent className="ion-padding">
      <IonModal
        trigger="open-success"
        initialBreakpoint={0.75}
        breakpoints={[0, 0.75]}
        ref={modal}
      >
        <IonContent className="ion-padding relative">
          <div className="w-full min-h-[65%] flex flex-col justify-center gap-2 items-center relative">
            <IonIcon
              icon={checkmarkCircle}
              color="success"
              className="text-8xl"
            />
            <h1 className="text-bold text-2xl">Payment successfull!</h1>
            <IonText>Your order is on the way</IonText>

            <Link
              to="/"
              replace={true}
              onClick={handleClose}
              className="border rounded-lg hover:bg-slate-600 hover:border-slate-600 text-center px-0 py-5 mx-0 my-5 w-[MAX(33%,250px)] md:max-w-[36%] lg:min-w-fit lg:max-w-[380px]"
            >
              Continue shopping
            </Link>
           
          </div> 
          {/* <CustomLoading isOpen={true} modal={true} /> */}
        </IonContent>
      </IonModal>
    </IonContent>
  );
};

export default SuccessContainer;
