import { useNavigate } from "react-router-dom";
import "../styles/startPage.scss";
import logo from "../assets/logo.png";

const StartPage = () => {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate("/menu"); 
  };

  return (
    <div className="start-page" onClick={handleClick}>
      <img src={logo} alt="Yum Yum Gimme Sum Logo" className="logo" />
    </div>
  );
};

export default StartPage;