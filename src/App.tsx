import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  cart,
  cartOutline,
  heart,
  heartOutline,
  home,
  homeOutline,
} from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Custom styles */
import "./theme/app.css";

/* Tailwind */
import "./theme/tailwind.css";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import PreviewPage from "./pages/Preview";
import { RootState } from "./redux/store";
import { useSelector } from "react-redux";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import { useState } from "react";

setupIonicReact();

const App: React.FC = () => {
  const cartCount = useSelector((state: RootState) => state.cart.count);
  const [activeTab, setActiveTab] = useState("home"); // Set the initial active tab
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  const { wishlist } = useSelector((state: RootState) => state.shop);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs onIonTabsDidChange={(e) => handleTabChange(e.detail.tab)}>
          <IonRouterOutlet>
            <Route exact path="/home" component={Home} />
            <Route exact path="/preview/:id" component={PreviewPage} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={Checkout} />
            <Route path="/wishlist" component={Wishlist} />
            <Route exact path="/" component={Home} />
          </IonRouterOutlet>

          <IonTabBar
            slot="bottom"
            className="flex w-[90%] g:w-[85%] rounded-lg p-2 m-auto mb-5 h-[3em]"
          >
            <IonTabButton tab="home" href="/home">
              <IonIcon
                aria-hidden="true"
                icon={activeTab === "home" ? home : homeOutline}
              />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="cart" href="/cart">
              <IonIcon
                aria-hidden="true"
                icon={activeTab === "cart" ? cart : cartOutline}
                className="relative"
              />
              {cartCount > 0 && (
                <div className="absolute flex justify-center items-center rounded-full p-0 top-0 ml-5 h-4 w-4 left-19 bg-red-400 text-red-white">
                  <p className="text-white m-0 p-0">{cartCount}</p>
                </div>
              )}
              <IonLabel>Cart</IonLabel>
            </IonTabButton>
            <IonTabButton tab="wishlist" href="/wishlist">
              <IonIcon
                aria-hidden="true"
                icon={activeTab === "wishlist" ? heart : heartOutline}
              />
              {wishlist.length > 0 && (
                <div className="absolute flex justify-center items-center rounded-full p-0 top-0 ml-5 h-4 w-4 left-19 bg-red-400 text-red-white">
                  <p className="text-white m-0 p-0">{wishlist.length}</p>
                </div>
              )}
              <IonLabel>Wishlist</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
