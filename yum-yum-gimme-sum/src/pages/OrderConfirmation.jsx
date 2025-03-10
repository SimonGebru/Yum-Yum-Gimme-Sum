import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import logo2 from "../assets/logo2.svg";
import DropdownMenu from "../components/DropdownMenu";
import OrderSummary from "../components/OrderSummary";
import { useState } from "react";
import "../styles/orderConf.scss";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const { orderNumber, eta, status, error } = useSelector((state) => state.order);

  const handleProceed = () => {
    dispatch(clearCart());
    localStorage.removeItem("cart"); 
    navigate("/menu");
  };

  const handleReceipt = () => {
    navigate("/receipt");
  };

  return (
    <div className="order-confirmation-page">
      <img src={logo2} alt="Logo" className="order-logo" onClick={toggleMenu} />
      <DropdownMenu isOpen={menuOpen} toggleMenu={toggleMenu} />

      {status === "loading" && <p>Lägger order...</p>}
      {status === "failed" && <p>Fel: {error}</p>}
      {status === "succeeded" && (
        <OrderSummary
          orderNumber={orderNumber}
          eta={eta}
          handleProceed={handleProceed}
          handleReceipt={handleReceipt}
        />
      )}

      {status === "idle" && <p>Ingen order finns att visa.</p>}
    </div>
  );
};

export default OrderConfirmation;