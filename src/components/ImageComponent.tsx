import { IonIcon, IonImg, IonRippleEffect } from "@ionic/react";
import { useState } from "react";
import { heartOutline } from "ionicons/icons";
import { addItem } from "../redux/features/cart/cartSlice";
import { Product } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";

const ImageComponent: React.FC<{ product: Product }> = ({ product }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  const handleImageOnLoad = () => {
    setLoading(false);
  };

  const handleAddToCart = (
    e: React.MouseEvent<HTMLIonIconElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    product.id && dispatch(addItem(product.id));
  };

  return (
    <div className="relative">
      <IonImg
        alt="Silhouette of mountains"
        src={
          product?.image ||
          "https://ionicframework.com/docs/img/demos/card-media.png"
        }
        onIonImgWillLoad={() => setLoading(true)}
        onIonImgDidLoad={handleImageOnLoad}
        className="aspect-[5/6] min-h-[180px] min-w-[140px] m-auto bg-white rounded object-center object-contain p-2"
      />
      {/* <ImageLoader setShowLoading={setLoading} showLoading={loading} /> */}
      <div
        aria-label="Add to cart"
        aria-describedby="heart-icon"
        className="absolute overflow-hidden ion-activatable text-black bg-[whitesmoke] right-1 bottom-1 z-10 p-0 h-30 w-30 border border-primary cursor-pointer rounded-[100%] flex justify-center items-center"
      >
        <IonRippleEffect></IonRippleEffect>
        <IonIcon
          icon={heartOutline}
          id="heart-icon"
          size="small"
          className="p-2 m-auto z-50"
          onClick={handleAddToCart}
        />
      </div>
    </div>
  );
};

export default ImageComponent;
