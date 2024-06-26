import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-around">
      <div>
        <h1>MapSense</h1>
      </div>

      <div>
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  );
};

export default Header;
