import {
  IonButton,
  IonContent,
  IonHeader,
  IonLabel,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { StoreContext } from "../context/store_context";
import Loader from "../components/Loader";
import { Product } from "../components/ProductsContainer";
import ImageComponent from "../components/ImageComponent";
import { CartContext } from "../context/cart_context";

interface PreviewPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const PreviewPage: React.FC<PreviewPageProps> = ({ match }) => {
  const { fetchSingleProduct } = useContext(StoreContext);
  const { addToCart } = useContext(CartContext);
  const [showLoading, setShowLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = match.params;

  const handleAddToCart = () => {
    addToCart(Number(id));
  };

  useEffect(() => {
    setShowLoading(true);
    fetchSingleProduct(Number(id))
      .then((res) => {
        setProduct(res);
        setShowLoading(false);
      })
      .catch((error) => console.log("error fetching product", error));
  }, [id]);

  useEffect(() => {
    return () => {
      setProduct(null);
    };
  }, []);

  if (!product) {
    return <Loader showLoading={showLoading} setShowLoading={setShowLoading} />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="whitespace-normal">
            Product
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense" className="py-0 mb-2 ">
          <IonToolbar>
            <IonTitle size="large" className="whitespace-normal">
              Product
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="flex flex-wrap gap-4 md:gap-8 px-4 justify-center my-6">
          <p className="text-lg font-bold my-2 md:hidden flex-2">
            {product && product.title}
          </p>
          <div className="w-full min-w-[40%] md:w-[40%] flex-2">
            <ImageComponent product={product} />
          </div>
          <div className="flex flex-wrap md:w-[40%] h-fit justify-start items-start gap-4">
            <p className="hidden text-lg font-bold md:flex w-full">
              {product && product.title}
            </p>
           
            <div className="min-w-[40%] flex-1 p-0 sm:self-end">
              <IonLabel>
                <h2>Category</h2>
                <IonNote className="capitalize p-0">{product.category}</IonNote>
              </IonLabel>
            </div> 
            <IonButton
              fill="outline"
              color="primary"
              className="border-white"
              onClick={() => handleAddToCart()}
            >
              Add to Cart
            </IonButton>
            <div className="border-0 shadow-transparent self-stretch bg-transparent p-0 outline-none sm:self-end w-[40%]">
              <IonLabel>
                <h1 className="text-4xl">${product.price}</h1>
              </IonLabel>
            </div>

            <div className="flex-2 w-full">
              <IonLabel>
                <h2>Description</h2>
                <IonNote className="whitespace-normal">
                  {product.description}
                </IonNote>
              </IonLabel>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PreviewPage;
