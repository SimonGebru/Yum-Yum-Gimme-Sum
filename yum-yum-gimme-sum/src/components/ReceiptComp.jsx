import logo from "../assets/logo.png";

const ReceiptComp = ({ orderNumber, items, total, handleNewOrder }) => {
  return (
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
      <span>TOTALT</span>
      <span className="moms">inkl 20% moms</span>
   </div>
   <span className="total-price">{total} SEK</span>
</div>
    </div>
  );
};

export default ReceiptComp;