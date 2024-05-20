import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ProductGallery from "../components/ProductGallery";
import ErrorContainer from "../components/ErrorContainer";
import Loader from "../components/Loader";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { clearWishlist } from "../redux/features/store/storeSlice";

const Wishlist: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, wishlist, products } = useSelector(
    (state: RootState) => state.shop
  );

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
  };

  return (
    <IonPage className="max-w-[1440px] mx-auto">
      <IonContent fullscreen className="px-2">
        <IonHeader collapse="condense">
          <IonToolbar>
            {/* <IonTitle size="large">{getGreeting()}</IonTitle> */}
          </IonToolbar>
        </IonHeader>
        <div className="my-5 px-2 mx-auto min-h-[70%] text-center">
          <h1 className="text-2xl text-left px-4 font-bold my-5">Wishlist</h1>
          <Loader showLoading={loading} infinite={loading} />
          {error ? (
            <>
              <ErrorContainer message={error} />
            </>
          ) : (
            <>
              <ProductGallery data={wishlist} />

              {wishlist.length > 0 && (
                <IonButton
                  color="medium"
                  className="mx-auto my-5 normal-case text-sm h-12 rounded-lg tracking-normal"
                  onClick={handleClearWishlist}
                >
                  Clear wishlist
                </IonButton>
              )}
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Wishlist;
