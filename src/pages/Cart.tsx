import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRippleEffect,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import OrderSummary from "../components/OrderSummary";
import CartItems from "../components/CartItems";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import EmptyCart from "../components/EmptyCart";
import { Link } from "react-router-dom";
import { arrowForward } from "ionicons/icons";

const Cart: React.FC = () => {
  const cartCount = useSelector((state: RootState) => state.cart.count);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cart</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Cart</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="max-w-[95%] mx-auto flex flex-wrap gap-4 gap-y-1 xs:justify-start sm:justify-center">
          {cartCount <= 0 ? (
            <EmptyCart />
          ) : (
            <>
              <CartItems />
              <OrderSummary />
              <Link
                to="/checkout"
                className="ion-activatable ripple-parent w-full max-w-xs rounded-rectangle border mx-auto my-4 flex items-center justify-between p-2 rounded-lg normal-case h-12 font-medium tracking-tight"
              >
                <IonText>Proceed to Checkout</IonText>
                <IonIcon
                  size="small"
                  icon={arrowForward}
                  className="ml-auto p-2 bg-white text-black rounded"
                ></IonIcon>
                <IonRippleEffect></IonRippleEffect>
              </Link>
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Cart;
