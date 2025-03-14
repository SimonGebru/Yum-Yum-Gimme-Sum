//Huvudkomponenten för kundvagnen. Loopar genom kundvagnen (cart.items) och visar varje produkt med CartItem. Visar totalpris och låter användaren tömma hela kundvagnen.

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../redux/orderSlice";
import "../styles/cart.scss";
import cartIcon from "../assets/Union.svg";
import CartItem from "../components/CartItem";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total } = useSelector((state) => state.cart);

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <img
          src={cartIcon}
          alt="Cart Icon"
          className="cart-icon-cart"
          onClick={() => navigate("/menu")}
        />
        <p className="empty-cart">Varukorgen är tom.</p>
      </div>
    );
  }
// skapar orderdata som innehåller tot belopp och varor för att sen skicka det via placeorder 
  const handleCheckout = async () => {
    const tenantId = localStorage.getItem("tenantId");
    const orderData = {
      tenant: tenantId,
      items,
      total,
    };

    await dispatch(placeOrder(orderData));
    navigate("/order");
  };

  return (
    <div className="cart-page">
      <img
        src={cartIcon}
        alt="Cart Icon"
        className="cart-icon-cart"
        onClick={() => navigate("/menu")}
      />

      <ul className="cart-items">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>

      <div className="cart-total-box">
        <span className="cart-total-label">TOTAL</span>
        <span className="cart-total-value">{total} SEK</span>
      </div>

      <button className="checkout-btn" onClick={handleCheckout}>
        TAKE MY MONEY!
      </button>
    </div>
  );
};

export default Cart;