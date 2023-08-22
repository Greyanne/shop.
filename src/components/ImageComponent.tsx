import { IonIcon, IonImg, IonRippleEffect } from "@ionic/react";
import { useMemo, useState } from "react";
import { heart, heartOutline } from "ionicons/icons";
import { Product } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import CustomLoading from "./CustomLoading";
import { toggleWishlist } from "../redux/features/store/storeSlice";

const ImageComponent: React.FC<{ product: Product }> = ({ product }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const { wishlist } = useSelector((state: RootState) => state.shop);

  const handleImageOnLoad = () => {
    setLoading(false);
  };

  const isInWishlist = useMemo(() => {
    return wishlist.indexOf(product.id) > -1 ? true : false;
  }, [wishlist, product.id]);

  const handleWishlist = (
    e: React.MouseEvent<HTMLIonIconElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.id) {
      dispatch(toggleWishlist(product.id))
    }
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
      <CustomLoading isOpen={loading} />
      <div
        aria-label="Add to cart"
        aria-describedby="heart-icon"
        className="absolute overflow-hidden ion-activatable text-black bg-[whitesmoke] right-1 bottom-1 z-10 p-0 h-30 w-30 border border-primary cursor-pointer rounded-[100%] flex justify-center items-center"
      >
        <IonRippleEffect></IonRippleEffect>
        <IonIcon
          icon={isInWishlist ? heart : heartOutline}
          color={isInWishlist ? "danger" : ""}
          id="heart-icon"
          size="small"
          className="p-2 m-auto z-50"
          onClick={handleWishlist}
        />
      </div>
    </div>
  );
};

export default ImageComponent;
