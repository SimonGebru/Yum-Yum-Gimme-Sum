import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import logoCorner from "../assets/logo2.svg";
import DropdownMenu from "../components/DropdownMenu";
import ReceiptComp from "../components/Receiptcomp";
import { useState } from "react";
import "../styles/receipt.scss";

const Receipt = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const { orderNumber } = useSelector((state) => state.order);
  const { items, total } = useSelector((state) => state.cart);

  const handleNewOrder = () => {
    dispatch(clearCart());
    localStorage.removeItem("cart");
    navigate("/menu");
  };

  return (
    <div className="receipt-page">
      <img src={logoCorner} alt="Union Logo" className="union-logo" onClick={toggleMenu} />
      <DropdownMenu isOpen={menuOpen} toggleMenu={toggleMenu} />

      <ReceiptComp
        orderNumber={orderNumber}
        items={items}
        total={total}
        handleNewOrder={handleNewOrder}
      />
      <button className="new-order-btn" onClick={handleNewOrder}>
        GÖR EN NY BESTÄLLNING
      </button>
    </div>
  );
};

export default Receipt;