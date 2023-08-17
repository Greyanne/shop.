import { IonContent, IonHeader, IonPage, IonRouterOutlet } from "@ionic/react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import Cart from "./Cart";
import Checkout from "./Checkout";

const CartLayout: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonPage>
      <IonRouterOutlet>
        <Route exact path={match.url} component={Cart} />
        <Route path={`${match.url}/checkout`} component={Checkout} />
        {/* <Route render={() => <Redirect to={match.url} />} /> */}
      </IonRouterOutlet>
    </IonPage>
  );
};

export default CartLayout;
