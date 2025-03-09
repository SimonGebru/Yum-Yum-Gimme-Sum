import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/receipt.scss";

const Receipt = () => {
  const navigate = useNavigate();

  // Hämtar orderinformation och cart från Redux-store
  const { orderNumber } = useSelector((state) => state.order);
  const { items, total } = useSelector((state) => state.cart);

  const handleNewOrder = () => {
    navigate("/menu");
  };

  return (
    <div className="receipt-page">
      <img src={logo} alt="YYGS Logo" className="receipt-logo" />

      <div className="receipt-container">
        <h1>KVITTO</h1>
        <p className="receipt-order-number">#{orderNumber}</p>

        <ul className="receipt-items">
          {items.map((item) => (
            <li key={item.id} className="receipt-item">
              <div className="receipt-item-header">
                <span className="receipt-item-name">{item.name.toUpperCase()}</span>
                <span className="receipt-line"></span>
                <span className="receipt-item-price">{item.price * item.quantity} SEK</span>
              </div>
              <div className="receipt-item-quantity">{item.quantity} stycken</div>
            </li>
          ))}
        </ul>

        <div className="receipt-total-box">
          <span className="total-text">TOTALT</span>
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