import { IonLoading } from "@ionic/react";
import { useState } from "react";
interface LoaderProps {
  showLoading: boolean;
  setShowLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Loader: React.FC<LoaderProps> = ({ showLoading, setShowLoading }) => {
  return (
    <IonLoading
      cssClass="my-custom-class"
      isOpen={showLoading}
      onDidDismiss={() => setShowLoading(false)}
      message={"Please wait..."}
      duration={1000}
    />
  );
};

export default Loader;
