import { IonLoading } from "@ionic/react";
interface LoaderProps {
  showLoading?: boolean;
  setShowLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageLoader: React.FC<LoaderProps> = ({
  showLoading,
  setShowLoading,
}) => {
  return (
    <div className="absolute border w-full overflow-hiddenflex justify-center items-center aspect-[5/6] min-h-[180px] min-w-[171px] p-2 top-0 left-0">
      <IonLoading
      spinner={'bubbles'}
        cssClass="relative"
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={"Loading..."}
        duration={10000}
      />
    </div>
  );
};

export default ImageLoader;
