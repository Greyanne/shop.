import { IonSearchbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import ProductGallery from "./ProductGallery";
import { Product } from "../types";
import store, { RootState } from "../redux/store";
import { fetchProducts } from "../redux/features/store/storeSlice";
import { useSelector } from "react-redux";
import EmptyContainer from "./ErrorContainer";

const ProductsContainer: React.FC = () => {
  const [products, setProducts] = useState<Product[] | []>([]);
  const [data, setData] = useState<Product[] | []>([]);
  const [searchValue, setSearchValue] = useState("");
  const { loading, error } = useSelector((state: RootState) => state.shop);

  const handleClear = () => {
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
    // setLoading(true);
    let query = "";
    const target = event.target as HTMLIonSearchbarElement;
    if (target) {
      query = target.value!.toLowerCase();
      setSearchValue(query);
    }
  };

  useEffect(() => {
    if (products && products.length > 0) {
      setData([...products]);
    } else {
      store.dispatch(fetchProducts());
    }
  }, [products]);

  useEffect(() => {
    if (searchValue) {
      filterAndUpdateProducts(searchValue);
    }
  }, [searchValue]);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      let { products: productStore } = store.getState().shop;
      setProducts(productStore);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="my-5 px-2 mx-auto min-h-[70%]">
      <p className="text-2xl px-4 font-bold my-5">Products</p>
      <IonSearchbar
        placeholder="Search products..."
        debounce={1000}
        value={searchValue}
        onIonInput={handleSearch}
        onIonClear={handleClear}
        show-clear-button="focus"
        className="w-full p-4 max-w-[1440px] mx-auto"
      ></IonSearchbar>
      {searchValue && (
        <p className="text-sm italic">
          Showing search results for{" "}
          <span className="font-bold">'{searchValue}'</span>{" "}
        </p>
      )}

      {loading ? (
        <Loader showLoading={loading} />
      ) : error ? (
        <>
          <EmptyContainer message={error} />
        </>
      ) : (
        <ProductGallery data={data} />
      )}
    </div>
  );
};

export default ProductsContainer;
