import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, decreaseQuantity, addToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import "../styles/cart.scss";
import cartIcon from "../assets/Union.svg";

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
          <li key={item.id} className="cart-item">
            <div className="cart-header">
              <span className="cart-name">{item.name.toUpperCase()}</span>
              <span className="cart-line"></span>
              <span className="cart-price">{item.price * item.quantity} SEK</span>
            </div>

            <div className="cart-controls">
              <button className="control-btn" onClick={() => dispatch(decreaseQuantity(item))}>–</button>
              <span className="quantity">{item.quantity}</span>
              <button className="control-btn" onClick={() => dispatch(addToCart(item))}>+</button>
              <button className="trash-btn" onClick={() => dispatch(removeFromCart(item))}>🗑</button>
            </div>
          </li>
        ))}
      </ul>

      <div className="cart-total-box">
        <span className="cart-total-label">TOTAL</span>
        <span className="cart-total-value">{total} SEK</span>
      </div>

      <button className="checkout-btn">TAKE MY MONEY!</button>
    </div>
  );
};

export default Cart;