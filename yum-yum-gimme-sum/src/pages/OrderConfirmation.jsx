import { useSelector } from "react-redux";
import "../styles/orderConf.scss";
import { useNavigate } from "react-router-dom";
import logo2 from "../assets/logo2.svg";
import boxtop from "../assets/boxtop.png";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { orderNumber, eta, status, error } = useSelector((state) => state.order);

  const handleProceed = () => {
    navigate("/receipt");
  };

  return (
    <div className="order-confirmation-page">
      {/* Logotyp i övre vänstra hörnet */}
      <img src={logo2} alt="Logo" className="order-logo" />

      {status === "loading" && <p>Lägger order...</p>}
      {status === "failed" && <p>Fel: {error}</p>}
      {status === "succeeded" && (
        <>
          {/* Lunchboxbild centrerad */}
          <div className="order-image-container">
            <img src={boxtop} alt="Lunchbox" className="order-lunchbox" />
          </div>
          <h1>Dina Wontons Tillagas!</h1>
           <p>
            ETA: <span>{eta}</span>
          </p>
          <p>
            Ditt ordernummer är: <span>{orderNumber}</span>
          </p>
         
          <button onClick={handleProceed} className="proceed-btn">
            Gör en ny beställning
          </button>
        </>
      )}

      {/* Om ingen orderlagts, kan du välja att visa ett meddelande */}
      {status === "idle" && <p>Ingen order finns att visa.</p>}
    </div>
  );
};

export default OrderConfirmation;