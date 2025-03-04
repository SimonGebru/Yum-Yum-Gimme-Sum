import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenuData, setMenuType } from "../redux/menuSlice";
import "../styles/menu.scss";
import logo2 from "../assets/logo2.svg";
import cartBox from "../assets/box.png";
import cartIcon from "../assets/Union.svg";

const Menu = () => {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu.items) || [];
  const status = useSelector((state) => state.menu.status);
  const selectedType = useSelector((state) => state.menu.selectedType);

  useEffect(() => {
    dispatch(fetchMenuData(selectedType)); // Hämta menyn för vald typ
  }, [dispatch, selectedType]);

  const handleTypeChange = (type) => {
    dispatch(setMenuType(type)); //  Uppdatera vald kategori
  };

  if (status === "loading") return <p>Laddar menyn...</p>;
  if (status === "failed") return <p>Det gick inte att hämta menyn.</p>;

  return (
    <div className="menu-page">
      <img src={logo2} alt="Yum Yum Gimme Sum Logo" className="logo2" />
      <div className="cart-container">
        <img src={cartBox} alt="Cart Box" className="cart-box" />
        <img src={cartIcon} alt="Cart Icon" className="cart-icon" />
        <span className="cart-badge">6</span>
      </div>

      <div className="menu-box">
        <h1>MENY</h1>

      
        

        <ul>
          {menu.length > 0 ? (
            menu.map((item) => (
              <li key={item.id} className="menu-item">
                <div className="menu-header">
                  <span className="menu-name">{item.name.toUpperCase()}</span>
                  <span className="menu-price">................ {item.price} SEK</span>
                </div>
                <p className="menu-description">{item.description}</p>
              </li>
            ))
          ) : (
            <p>Menyn är tom.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Menu;