import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, decreaseQuantity, addToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import "../styles/cart.scss";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total } = useSelector((state) => state.cart);

  return (
    <div className="cart-page">
      <h2>Varukorg</h2>

      {items.length > 0 ? (
        <ul className="cart-items">
          {items.map((item) => (
            <li key={item.id} className="cart-item">
              <span>{item.name}</span>
              <div className="cart-controls">
                <button onClick={() => dispatch(decreaseQuantity(item))}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(addToCart(item))}>+</button>
                <button onClick={() => dispatch(removeFromCart(item))}>🗑</button>
              </div>
              <span>{item.price * item.quantity} SEK</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Varukorgen är tom.</p>
      )}

      <div className="cart-footer">
        <h3>Total: {total} SEK</h3>
        <button className="checkout-btn">Take my money!</button>
        <button className="back-btn" onClick={() => navigate("/menu")}>Tillbaka till menyn</button>
      </div>
    </div>
  );
};

export default Cart;