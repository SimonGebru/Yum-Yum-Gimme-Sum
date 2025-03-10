import boxtop from "../assets/boxtop.png";

const OrderSummary = ({ orderNumber, eta, handleProceed, handleReceipt }) => {

  const calculateEtaMinutes = (eta) => {
    const diff = (new Date(eta) - new Date()) / 60000;
    return Math.round(diff);
  };

  return (
    <>
      <div className="order-image-container">
        <img src={boxtop} alt="Lunchbox" className="order-lunchbox" />
      </div>
      <h1>Dina Wontons <br />Tillagas!</h1>
      <p>
        ETA <span>{calculateEtaMinutes(eta)} MIN</span>
      </p>
      <p>
        <span>#{orderNumber}</span>
      </p>

      <button className="proceed-btn" onClick={handleReceipt}>
        Visa kvitto
      </button>

      <button className="proceed-btn" onClick={handleProceed}>
        Gör en ny beställning
      </button>
    </>
  );
};

export default OrderSummary;