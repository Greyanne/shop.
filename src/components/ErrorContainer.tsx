import { IonButton } from "@ionic/react";

interface Props {
  message?: string;
}

const ErrorContainer: React.FC<Props> = ({ message }) => {
  return (
    <div className="container mx-auto">
      <h1 className="m-auto text-xl py-4">
        {message ? message : "No products found"}
      </h1>
      <IonButton
        href="/"
        color={"medium"}
        className="rounded-lg p-2 px-4 normal-case leading-tighter"
      >
        Try again
      </IonButton>
    </div>
  );
};

export default ErrorContainer;
