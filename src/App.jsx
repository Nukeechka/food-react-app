import Meals from "./components/Food/Meal";
import Header from "./components/Layout/Header";
import Cart from "./components/Cart/Cart";
import { useState } from "react";
import CartContextProvider from "./store/CartContextProvider";

function App() {
  const [cartIsVisible, setCartIsVisible] = useState(false);

  const cartHandler = () => {
    setCartIsVisible((value) => !value);
  };
  return (
    <CartContextProvider>
      <>
        {cartIsVisible && <Cart onShowCart={cartHandler} />}
        <Header onShowCart={cartHandler} />
        <main>
          <Meals />
        </main>
      </>
    </CartContextProvider>
  );
}

export default App;
