// Hanterar enskilda produkter i vagnen, knappar för att öka, minska eller ta bort produkter.

import { useDispatch } from "react-redux";
import { removeFromCart, decreaseQuantity, addToCart } from "../redux/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <li className="cart-item">
      <div className="cart-header">
        <span className="cart-name">{item.name.toUpperCase()}</span>
        <span className="cart-line"></span>
        <span className="cart-price">{item.price * item.quantity} SEK</span>
      </div>

      <div className="cart-controls">
        <button className="control-btn" onClick={() => dispatch(decreaseQuantity(item))}>
          –
        </button>
        <span className="quantity">{item.quantity}</span>
        <button className="control-btn" onClick={() => dispatch(addToCart(item))}>
          +
        </button>
        <button className="trash-btn" onClick={() => dispatch(removeFromCart(item))}>
          🗑
        </button>
      </div>
    </li>
  );
};

export default CartItem;