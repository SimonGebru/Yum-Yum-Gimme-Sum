import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const DipItem = ({ dip }) => {
  const dispatch = useDispatch();

  return (
    <span
      className="dip-item"
      onClick={() => dispatch(addToCart(dip))}
    >
      {dip.name}
    </span>
  );
};

export default DipItem;