import {
  IonButton,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonNote,
  IonRippleEffect,
  IonText,
} from "@ionic/react";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { arrowForward } from "ionicons/icons";
import { Link } from "react-router-dom";

const OrderSummary = () => {
  const { products, count } = useSelector((state: RootState) => state.cart);
  const total = useMemo(
    () =>
      [...products]
        .map((item) => item.price * item.count)
        .reduce((acc, cv) => acc + cv, 0)
        .toFixed(2),
    [products]
  );
  return (
    <div className="min-w-[MAX(33%,250px)]  w-full md:max-w-[36%] lg:min-w-fit  lg:max-w-[380px] my-2">
      <IonItemGroup>
        <IonItem>
          <IonLabel>
            {count > 1 ? `${count} items` : `${count || 0} item`}
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Subtotal</IonLabel>
          <IonNote className="text-2xl align-bottom p-0 my-2 items-end">
            ${total}
          </IonNote>
        </IonItem>
      </IonItemGroup>
      <Link
        to="/checkout"
        className="ion-activatable ripple-parent rounded-rectangle border mx-2 my-4 flex items-center justify-between p-2 rounded-lg normal-case h-12 font-medium tracking-tight"
      >
        <IonText>Proceed to Checkout</IonText>
        <IonIcon
          size="small"
          icon={arrowForward}
          className="ml-auto p-2 bg-white text-black rounded"
        ></IonIcon>
        <IonRippleEffect></IonRippleEffect>
      </Link>
    </div>
  );
};

export default OrderSummary;
