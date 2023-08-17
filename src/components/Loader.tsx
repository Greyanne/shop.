import { IonLoading } from "@ionic/react";
interface LoaderProps {
  infinite?: boolean;
  showLoading: boolean;
  setShowLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Loader: React.FC<LoaderProps> = ({
  showLoading,
  setShowLoading,
  infinite,
}) => {
  return (
    <div className="container">
      <IonLoading
      cssClass="my-custom-class"
      isOpen={showLoading}
      onDidDismiss={() => setShowLoading && setShowLoading(false)}
      message={"Please wait..."}
      // duration={!infinite ? 1000 : undefined}
    />
    </div>
    
  );
};

export default Loader;
