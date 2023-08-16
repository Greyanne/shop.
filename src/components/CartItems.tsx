import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonIcon,
  IonImg,
  IonText,
} from "@ionic/react";
import { add, closeOutline, remove } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";


import {
  addItem,
  deleteItem,
  decrementItem,
} from "../redux/features/cart/cartSlice";

const CartItems = () => {
  const cartItems = useSelector((state: RootState) => state.cart.products);
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteItem = (id: number) => {
    dispatch(deleteItem(id));
  };
  const handleDecrementItem = (id: number) => {
    dispatch(decrementItem(id));
  };
  const handleIncrementItem = (id: number) => {
    dispatch(addItem(id));
  };

  return (
    <div className="flex flex-wrap w-full md:max-w-[60%] lg:max-w-[48%] justify-start gap-2 m-0 my-2 mx-0">
      {cartItems.map((product, index) => (
        <IonCard key={index} className="flex gap-1 w-full m-0 p-0 relative">
          <div className="aspect-[6/7] p-4 bg-white xs:w-full w-[max(40%,110px)] max-w-[130px] flex justify-center items-center">
            <IonImg
              src={
                product.image ||
                "https://ionicframework.com/docs/img/demos/card-media.png"
              }
              className="rounded object-center object-contain p-2"
            />
          </div>

          <IonCardContent className="py-4 px-2 m-0 flex flex-col gap-3">
            <IonCardSubtitle className="m-0 p-0 text-xl sm:text-xl font-bold text-ellipsis normal-case">
              {`$${product.price || 0.0}`}
            </IonCardSubtitle>
            <IonCardSubtitle className="m-0 p-1 font-normal text-ellipsis normal-case line-clamp-3">
              {product.title}
            </IonCardSubtitle>

            <IonButtons className="flex w-fit gap-2 m-0 p-0 mt-auto border rounded-full">
              <IonButton
                onClick={() => handleDecrementItem(product.id)}
                color="medium"
                size="small"
              >
                <IonIcon icon={remove}></IonIcon>
              </IonButton>
              <IonText className="text-sm p-1 px-2">
                {product.count}
              </IonText>
              <IonButton
                onClick={() => handleIncrementItem(product.id)}
                color="medium"
              >
                <IonIcon icon={add}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonCardContent>
          <IonIcon
            size="small"
            icon={closeOutline}
            className="ml-auto px-2 absolute top-3 right-2"
            onClick={() => handleDeleteItem(product.id)}
          ></IonIcon>
        </IonCard>
      ))}
    </div>
  );
};

export default CartItems;
