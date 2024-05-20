import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import Loader from "../components/Loader";
import ImageComponent from "../components/ImageComponent";
import baseUrl from "../utils/baseUrl";
import { AppDispatch } from "../redux/store";
import { addItem } from "../redux/features/cart/cartSlice";
import { Product } from "../types";
import { useDispatch } from "react-redux";

interface PreviewPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const PreviewPage: React.FC<PreviewPageProps> = ({ match }) => {
  const [showLoading, setShowLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = match.params;
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = () => {
    dispatch(addItem(Number(id)));
  };

  useEffect(() => {
    const fetchProduct = () => {
      setShowLoading(true);
      return baseUrl.get(`${id}`).then((response) => {
        setProduct(response.data);
        setShowLoading(false);
      });
    };
    fetchProduct();
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
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Product Preview</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="px-2">
        <div className="flex flex-wrap gap-4 md:gap-8 px-4 justify-center">
          <h1 className="text-2xl mr-auto text-left px-0 font-bold my-5">
            Product Preview
          </h1>
          <div className="w-full min-w-[40%] md:w-[40%] flex-2">
            <ImageComponent product={product} />
          </div>
          <div className="flex flex-wrap md:w-[40%] h-fit justify-start items-start gap-4">
            <p className="text-lg font-bold md:flex w-full">
              {product && product.title}
            </p>

            <div className="min-w-[40%] flex-1 p-0 sm:self-end">
              <h1 className="text-2xl font-extrabold">${product.price}</h1>
            </div>

            <IonButton
              color={"white"}
              onClick={handleAddToCart}
              className="sm:block z-50 font-medium normal-case tracking-tight min-w-fit max-w-fit rounded-lg flex-1 h-5 self-center text-black bg-[whitesmoke]"
            >
              Add to cart
            </IonButton>
            <div className="border-0 shadow-transparent self-stretch bg-transparent p-0 outline-none sm:self-end w-[40%]">
              <IonLabel>
                <h2>Category</h2>
                <IonNote className="capitalize p-0 py-1">
                  {product.category}
                </IonNote>
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
