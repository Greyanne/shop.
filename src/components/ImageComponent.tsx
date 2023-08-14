import { IonIcon, IonImg, IonRippleEffect } from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import ImageLoader from "./ImageLoader";
import { heartOutline } from "ionicons/icons";
import { CartContext } from "../context/cart_context";
import { Product } from "./ProductsContainer";

const ImageComponent: React.FC<{product: Product}> = ({product}) => {
  const { addToCart } = useContext(CartContext);

  const [loading, setLoading] = useState(true);

  const handleImageOnLoad = () => {
    setLoading(false);
  };

  const handleAddToCart = () => {
    addToCart(product.id)
  }

  return (
    <div className="relative">
      <IonImg
        alt="Silhouette of mountains"
        src={product?.image}
        onIonImgWillLoad={() => setLoading(true)}
        onIonImgDidLoad={handleImageOnLoad}
        className="aspect-[5/6] min-h-[180px] min-w-[171px] m-auto bg-white rounded object-center object-contain p-2"
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
          className="p-2 m-auto"
          onClick={handleAddToCart}
        />
      </div>
    </div>
  );
};

export default ImageComponent;
