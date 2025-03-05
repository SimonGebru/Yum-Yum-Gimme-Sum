import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { fetchMenuData, setMenuType } from "../redux/menuSlice";
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
  const selectedType = useSelector((state) => state.menu.selectedType);

  useEffect(() => {
    dispatch(fetchMenuData(selectedType)); // Hämta menyn baserat på typ
  }, [dispatch, selectedType]);

  if (status === "loading") return <p>Laddar menyn...</p>;
  if (status === "failed") return <p>Det gick inte att hämta menyn.</p>;

  // Filtrera dippsåser och övriga rätter
  const dips = menu.filter((item) => item.type === "dip");
  const otherItems = menu.filter((item) => item.type !== "dip");

  return (
    <div className="menu-page">
      <img src={logo2} alt="Yum Yum Gimme Sum Logo" className="logo2" />
      <div className="cart-container">
        <div className="cart-box" onClick={() => navigate("/cart")} /> {/* Navigera till cart */}
        <img 
          src={cartIcon} 
          alt="Cart Icon" 
          className="cart-icon" 
          onClick={() => navigate("/cart")} 
        />
        <span className="cart-badge">6</span>
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

        {/* Dippsåser sist */}
        {dips.length > 0 && (
          <>
            <div className="menu-dips-header">
              <span>DIPSÅS</span>
              <span className="menu-line"></span>
              <span className="menu-price">19 SEK</span>
            </div>
            <div className="dips-container">
              {dips.map((dip) => (
                <span key={dip.id} className="dip-item">{dip.name}</span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;