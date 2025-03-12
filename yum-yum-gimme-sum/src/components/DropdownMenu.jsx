import { useNavigate } from "react-router-dom";
import "../styles/dropdownMenu.scss";

const DropdownMenu = ({ isOpen, toggleMenu }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    toggleMenu(); 
  };

  if (!isOpen) return null;

  return (
    <div className="dropdown-menu">
      <button onClick={() => handleNavigate("/menu")}>Meny</button>
      <button onClick={() => handleNavigate("/order")}>Orderstatus</button>
      <button onClick={() => handleNavigate("/receipt")}>Kvitto</button>
    </div>
  );
};

export default DropdownMenu;