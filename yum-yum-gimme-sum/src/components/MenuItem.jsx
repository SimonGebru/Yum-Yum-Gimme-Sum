// Hanterar enbart rätterna

import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const MenuItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <li className="menu-item" onClick={() => dispatch(addToCart(item))}>
      <div className="menu-header">
        <span className="menu-name">{item.name.toUpperCase()}</span>
        <span className="menu-line"></span>
        <span className="menu-price">{item.price} SEK</span>
      </div>
      {item.ingredients && (
        <p className="menu-ingredients">{item.ingredients.join(", ")}</p>
      )}
    </li>
  );
};

export default MenuItem;