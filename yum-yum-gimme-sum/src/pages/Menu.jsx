import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenuData } from "../redux/menuSlice";
import "../styles/menu.scss";
import logo2 from "../assets/logo2.svg";
import cartIcon from "../assets/Union.svg";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "../components/DropdownMenu";
import MenuItem from "../components/MenuItem";
import DipItem from "../components/DipItem";

const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
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
      <img src={logo2} alt="Yum Yum Gimme Sum Logo" className="logo2" onClick={toggleMenu} />

      <DropdownMenu isOpen={menuOpen} toggleMenu={toggleMenu} />

      <div className="cart-container">
        <div className="cart-box" onClick={() => navigate("/cart")} /> 
        <img 
          src={cartIcon} 
          alt="Cart Icon" 
          className="cart-icon" 
          onClick={() => navigate("/cart")} 
        />
        <span className="cart-badge">{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
      </div>

      <div className="menu-box">
        <h1>MENY</h1>

        <ul>
          {menu.filter(item => item.type !== 'dip' && item.type !== 'drink').map(item => (
            <MenuItem key={item.id} item={item} /> 
          ))}
        </ul>

        {dips.length > 0 && (
  <>
    <div className="menu-dips-header">
      <span>DIPSÅS</span>
      <span className="menu-line"></span>
      <span className="menu-price">19 SEK</span>
    </div>
    <div className="dips-container">
      {dips.map((dip) => (
        <DipItem key={dip.id} dip={dip} />
      ))}
    </div>
  </>
)}

        {drinks.length > 0 && (
          <div className="drinks-section">
            <h2 className="drink-section-title">DRYCKER</h2>
            <ul className="drinks-container">
              {drinks.map((drink) => (
                <MenuItem key={drink.id} item={drink} />  
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;