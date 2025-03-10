import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { fetchMenuData } from "../redux/menuSlice";
import "../styles/menu.scss";
import logo2 from "../assets/logo2.svg";
import cartBox from "../assets/box.png";
import cartIcon from "../assets/Union.svg";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menu = useSelector((state) => state.menu.items) || [];
  const status = useSelector((state) => state.menu.status);

  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    dispatch(fetchMenuData());
  }, [dispatch]);

  if (status === "loading") return <p>Laddar menyn...</p>;
  if (status === "failed") return <p>Det gick inte att hämta menyn.</p>;

  const dips = menu.filter((item) => item.type === "dip");
  const drinks = menu.filter((item) => item.type === "drink");
  const otherItems = menu.filter((item) => item.type !== "dip" && item.type !== "drink");

  return (
    <div className="menu-page">
      <img src={logo2} alt="Yum Yum Gimme Sum Logo" className="logo2" />
      <div className="cart-container">
        <div className="cart-box" onClick={() => navigate("/cart")} /> 
        <img 
          src={cartIcon} 
          alt="Cart Icon" 
          className="cart-icon" 
          onClick={() => navigate("/cart")} 
        />
        <span className="cart-badge">{cartItemCount}</span>
      </div>

      <div className="menu-box">
        <h1>MENY</h1>

        {/* Övriga rätter */}
        <ul>
          {otherItems.length > 0 ? (
            otherItems.map((item) => (
              <li 
                key={item.id} 
                className="menu-item" 
                onClick={() => dispatch(addToCart(item))}
              >
                <div className="menu-header">
                  <span className="menu-name">{item.name.toUpperCase()}</span>
                  <span className="menu-line"></span>
                  <span className="menu-price">{item.price} SEK</span>
                </div>
                {item.ingredients && (
                  <p className="menu-ingredients">{item.ingredients.join(", ")}</p>
                )}
              </li>
            ))
          ) : (
            <p>Menyn är tom.</p>
          )}
        </ul>

        {/* Dippsåser */}
        {dips.length > 0 && (
          <>
            <div className="menu-dips-header">
              <span>DIPSÅS</span>
              <span className="menu-line"></span>
              <span className="menu-price">19 SEK</span>
            </div>
            <div className="dips-container">
              {dips.map((dip) => (
                <span
                  key={dip.id}
                  className="dip-item"
                  onClick={() => dispatch(addToCart(dip))}
                >
                  {dip.name}
                </span>
              ))}
            </div>
          </>
        )}

        {/* Drinksektion med scroll */}
        {drinks.length > 0 && (
          <div className="drinks-section">
            <h2 className="drink-section-title">DRYCKER</h2>
            <ul className="drinks-container">
              {drinks.map((drink) => (
                <li
                  key={drink.id}
                  className="menu-item"
                  onClick={() => dispatch(addToCart(drink))}
                >
                  <div className="menu-header">
                    <span className="menu-name">{drink.name.toUpperCase()}</span>
                    <span className="menu-line"></span>
                    <span className="menu-price">{drink.price} SEK</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;