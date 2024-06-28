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

      <div className="flex justify-center items-center">
        <div>
          <a
            id="export-png"
            className="bg-[#3590F0] border-2 border-white text-white mr-10 py-2  px-3 rounded-full "
            role="button"
          >
            <i className="fa fa-download"></i>{" "}
            <h1 className="hidden lg:inline">Download as PNG</h1>
          </a>
          <a id="image-download" download="map.png"></a>
        </div>

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
