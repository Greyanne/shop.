import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonGrid,
  IonIcon,
  IonImg,
  IonRippleEffect,
  IonRow,
  IonSearchbar,
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/store_context";
import { cart, heart, heartOutline } from "ionicons/icons";
import Loader from "./Loader";
import EmptyContainer from "./EmptyContainer";
import ImageComponent from "./ImageComponent";
import { CartContext } from "../context/cart_context";

export interface Product {
  title: string;
  image: string;
  price: string;
  description: string;
  id: number;
  category: string;
}

const ProductsContainer: React.FC = () => {
  const { products } = useContext(StoreContext);
  const [data, setData] = useState<Product[] | []>([...products]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (
    e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>,
    id: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(id);
  };

  const handleClear = () => {
    setLoading(true);
    setData([...products]);
    setSearchValue("");
  };

  const filterAndUpdateProducts = (title: string) => {
    let results = products.filter(
      (product) => product.title.toLowerCase().indexOf(title) > -1
    );
    setData([...results]);
  };

  const handleSearch = (event: Event) => {
    setLoading(true);
    let query = "";
    const target = event.target as HTMLIonSearchbarElement;
    if (target) {
      query = target.value!.toLowerCase();
      setSearchValue(query);
    }
  };

  useEffect(() => {
    console.log({ products });
    if (products) {
      setData([...products]);
    }
  }, [products]);

  useEffect(() => {
    if (searchValue) {
      filterAndUpdateProducts(searchValue);
    }
  }, [searchValue]);

  return (
    <div className="my-5 px-4 min-h-[70%]">
      <p className="text-lg font-bold my-5">Products</p>
      <IonSearchbar
        placeholder="Search products..."
        debounce={1000}
        value={searchValue}
        onIonInput={handleSearch}
        onIonClear={handleClear}
        show-clear-button="focus"
        className="w-full p-0 max-w-[980px] mx-auto"
      ></IonSearchbar>
      {searchValue && (
        <p className="text-sm italic">
          Showing search results for{" "}
          <span className="font-bold">'{searchValue}'</span>{" "}
        </p>
      )}

      {loading ? (
        <Loader setShowLoading={setLoading} showLoading={loading} />
      ) : data.length <= 0 ? (
        <EmptyContainer />
      ) : (
        <div>
          <IonGrid className="p-0 my-5 mx-auto max-w-[980px]">
            <IonRow className="grid grid-cols-products justify-start py-4 gap-4">
              {data.map((product, index) => (
                <IonCard
                  key={index}
                  href={`/preview/${product.id}`}
                  // onClick={(e) => e.preventDefault()}
                  // routerLink={`/preview/${product.id}`}
                  className="flex flex-col p-0 m-0 mx-auto justify-between gap-4 max-w-[300px] xs:min-w-[MIN(120px, 50%)] cursor-pointer"
                >
                  <ImageComponent product={product} />
                  <div className="flex flex-wrap gap-1 justify-between p-4 pb-5 items-stretch min-h-[100px] sm:min-h-[150px]">
                    <IonCardHeader className="p-0 m-0 w-[100%] flex-2">
                      <IonCardSubtitle className="text-sm sm:text-lg font-normal text-ellipsis normal-case line-clamp-2">
                        {product.title}
                      </IonCardSubtitle>
                    </IonCardHeader>

                    <IonCardContent className="p-0 py-2 font-medium flex-1 self-end">
                      ${product.price}
                    </IonCardContent>

                    <IonButton
                      color={"white"}
                      onClick={(e) => handleAddToCart(e, product.id)}
                      className="hidden sm:block z-50 font-medium normal-case tracking-tight min-w-fit max-w-fit rounded-lg flex-1 h-5 self-center text-black bg-[whitesmoke]"
                    >
                      Add to cart
                    </IonButton>
                  </div>
                </IonCard>
              ))}

              <IonCard
                routerLink="/products/preview"
                className="flex flex-col p-0 m-0 justify-around max-w-[300px] xs:min-w-[46%] aspect-[5/8] cursor-pointer"
              >
                <div className="relative h-[100%]">
                  <img
                    alt="Silhouette of mountains"
                    src={
                      "https://ionicframework.com/docs/img/demos/card-media.png"
                    }
                    className="h-[100%] m-auto aspect-[5/6] bg-white rounded object-center object-contain p-2"
                  />
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
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1 justify-end p-4 pb-5 h-[100px] sm:h-[150px]">
                  <IonCardHeader className="p-0 m-0 ">
                    <IonCardSubtitle className="text-sm sm:text-lg font-normal text-ellipsis normal-case line-clamp-2">
                      Title
                    </IonCardSubtitle>
                  </IonCardHeader>

                  <IonCardContent className="p-0 font-medium">
                    $99
                  </IonCardContent>
                </div>
              </IonCard>
            </IonRow>
          </IonGrid>
        </div>
      )}
    </div>
  );
};

export default ProductsContainer;
