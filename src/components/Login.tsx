import { useState, useRef } from "react";
import login from "./assets/login.svg";
import register from "./assets/register.svg";
import { useNavigate } from "react-router-dom";

interface UserInfo {
  email: string;
  password: string;
  id: string;
}

const Login: React.FC = () => {
  const [isSignUpMode, setIsSignUpMode] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const signInHandler = () => {
    setIsSignUpMode(false);
  };

  const signUpHandler = () => {
    setIsSignUpMode(true);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const username = usernameRef?.current?.value?.trim();
    const password = passwordRef?.current?.value?.trim();

    if (username?.length === 0 || password?.length === 0) {
      setIsError(true);
      setErrorMessage("Fill All Fields");
      return;
    }

    const res = await fetch(
      "https://667a9e54bd627f0dcc8fc55b.mockapi.io/api/v1/login/Login"
    );

    const data: UserInfo[] = await res.json();
    const currUser = {
      email: username,
      password: password,
    };

    const user = data.filter(
      (t) => t.email === currUser.email && t.password === currUser.password
    );

    if (user.length === 0) {
      setIsError(true);
      setErrorMessage("Wrong username or password");
      return;
    }

    //redirect to the home page
    navigate("/");
  };

  const changeHandler = () => {
    setIsError(false);
  };

  return (
    <div
      className={`container relative w-[100%] bg-white min-h-[100vh] overflow-hidden ${
        isSignUpMode ? "sign-up-mode" : ""
      }`}
    >
      <div className="forms-container absolute w-[100%] h-[100%] top-0 left-0">
        <div className="signin-signup absolute top-[50%] left-[75%] w-[50%] grid grid-cols-[1fr] z-10">
          <form action="#" className="sign-in-form">
            <h2 className="title text-[2.2rem] text-[#444] mb-[10px]">
              Sign in
            </h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                ref={usernameRef}
                onChange={changeHandler}
                type="text"
                placeholder="Username"
              />
            </div>

            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                ref={passwordRef}
                onChange={changeHandler}
                type="password"
                placeholder="Password"
              />
            </div>

            <input
              type="submit"
              value="Login"
              onClick={loginHandler}
              className="btn solid"
            />

            {isError && (
              <div className="text-center ">
                <h1 className="w-60 text-red-600">{errorMessage}</h1>
              </div>
            )}

            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>

          <form action="#" className="sign-up-form">
            <h2 className="title text-[2.2rem] text-[#444] mb-[10px]">
              Sign up
            </h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" className="btn" value="Sign up" />
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel  ">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Become a member of our community by registering today and unlock
              exclusive benefits, personalized content, and the latest updates
              tailored just for you!
            </p>
            <button
              onClick={signUpHandler}
              className="btn transparent"
              id="sign-up-btn"
            >
              Sign up
            </button>
          </div>
          <img src={login} className="image" alt="" />
        </div>

        <div className="panel right-panel">
          <div className="content ">
            <h3>One of us ?</h3>
            <p>
              Dive into your personalized content, exclusive benefits, and the
              latest updates curated just for you!
            </p>
            <button
              onClick={signInHandler}
              className="btn transparent"
              id="sign-in-btn"
            >
              Sign in
            </button>
          </div>
          <img src={register} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
