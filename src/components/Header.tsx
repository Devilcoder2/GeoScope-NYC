import { useState } from "react";

const Header = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const loginHandler = () => {
    setIsLogin(true);
  };

  const logoutHandler = () => {
    setIsLogin(false);
  };

  return (
    <div className="flex justify-around">
      <div>
        <h1>MapSense</h1>
      </div>

      <div>
        {!isLogin && <button onClick={loginHandler}>Login</button>}
        {isLogin && <button onClick={logoutHandler}>Logout</button>}
      </div>
    </div>
  );
};

export default Header;
