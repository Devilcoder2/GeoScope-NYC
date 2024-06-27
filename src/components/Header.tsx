import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-between h-full items-center ">
      <div>
        <h1 className="text-2xl ml-10 font-semibold text-white ">MapSense</h1>
      </div>

      <div className="">
        <button
          className="bg-[#3590F0] border-2 border-white text-white mr-10 py-1  px-3 rounded-full "
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
