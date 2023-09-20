// import './App.css'
import { Toaster } from "react-hot-toast";
import { StateContext } from "./config/store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Suspense, lazy } from "react";
import Loader from "./utils/Loader";
const Routespath = lazy(() => import("./routes/Routespath"));

function Load() {
  return (
    <div className="d-flex vh-100 justify-content-center">
      <Loader title={"Welcome to ShopnBuy"} />
    </div>
  );
}
function App() {
  return (
    <StateContext>
      <PayPalScriptProvider deferLoading={true}>
        <Toaster position="bottom-right" />
        <Suspense fallback= {<Load/>}>
          <Routespath />
        </Suspense>
      </PayPalScriptProvider>
    </StateContext>
  );
}

export default App;
