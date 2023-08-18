import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonGrid,
  IonRow,
} from "@ionic/react";
import React from "react";
import ImageComponent from "./ImageComponent";
import { AppDispatch } from "../redux/store";
import EmptyContainer from "./ErrorContainer";
import { Product } from "../types";
import { addItem } from "../redux/features/cart/cartSlice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const ProductGallery: React.FC<{ data: Product[] | [] }> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (
    e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>,
    id: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addItem(id));
  };

  return (
    <IonGrid className="p-2 md:p-4 my-5 mx-auto max-w-[1440px]">
      <IonRow className="grid grid-cols-products justify-start py-4 gap-4">
        {data.length <= 0 ? (
          <EmptyContainer />
        ) : (
          data.map((product, index) => (
            <Link to={`/preview/${product.id}`} key={index}>
              <IonCard className="flex flex-col p-0 m-0 mx-auto justify-between gap-4 max-w-[300px] xs:min-w-[MIN(120px, 50%)] cursor-pointer">
                <ImageComponent product={product} />
                <div className="flex flex-wrap gap-1 justify-between p-4 pb-5 items-stretch h-[100px] sm:h-[150px]">
                  <IonCardHeader className="p-0 m-0 w-[100%] flex-2">
                    <IonCardSubtitle className="text-sm sm:text-lg font-normal text-ellipsis normal-case line-clamp-2">
                      {product.title}
                    </IonCardSubtitle>
                  </IonCardHeader>

                  <IonCardContent className="p-0 py-2 font-medium flex-1 self-center">
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
            </Link>
          ))
        )}
      </IonRow>
    </IonGrid>
  );
};

export default ProductGallery;
