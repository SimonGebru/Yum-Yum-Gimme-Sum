import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import logoCorner from "../assets/logo2.svg";
import "../styles/receipt.scss";

const Receipt = () => {
  const navigate = useNavigate();

  const { orderNumber } = useSelector((state) => state.order);
  const { items, total } = useSelector((state) => state.cart);

  const handleNewOrder = () => {
    navigate("/menu");
  };

  return (
    <div className="receipt-page">
      <img src={logoCorner} alt="Union Logo" className="union-logo" />

      <div className="receipt-container">
        <img src={logo} alt="YYGS Logo" className="receipt-logo" />
        <h1>KVITTO</h1>
        <p className="receipt-order-number">#{orderNumber}</p>

        <ul className="receipt-items">
          {items.map((item) => (
            <li key={item.id} className="receipt-item">
              <div className="receipt-item-info">
                <span className="receipt-item-name">{item.name.toUpperCase()}</span>
                <span className="item-quantity">{item.quantity} stycken</span>
              </div>
              <span className="receipt-line"></span>
              <span className="receipt-item-price">{item.price * item.quantity} SEK</span>
            </li>
          ))}
        </ul>

        <div className="receipt-total-box">
          <div className="total-text">
            TOTALT
            <span className="moms">inkl 20% moms</span>
          </div>
          <span className="total-price">{total} SEK</span>
        </div>
      </div>

      <button className="new-order-btn" onClick={handleNewOrder}>
        GÖR EN NY BESTÄLLNING
      </button>
    </div>
  );
};

export default Receipt;