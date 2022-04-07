import { useContext, useState } from "react";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { UserContext } from "../../Context/UserContext/UserContext";
import { Notebook } from "phosphor-react";
import { Button } from "../../Components/Button/Button";
import { Toast } from "../../Components/Toast/Toast";
import { Link } from "react-router-dom";
import "./Authentication.css";
export function Signin() {
  const { theme } = useContext(ThemeContext);
  const [userData, setUserData] = useState({
    password: null,
    email: null
  });
  const {
    signin,
    setIsSigningup,
    isSigningup,
    message,
    setMessage
  } = useContext(UserContext);
  const closeToast = () => {
    setMessage(null);
    setIsSigningup(false);
  };

  return (
    <section className="Signup Page AuthenticationPage">
      <form
        onSubmit={(e) => signin(e, userData)}
        style={{ backgroundColor: theme.depthColor }}
        className="authenticationPageForm "
      >
        <div className="authenticationFormHeader">
          <h1 className="hasDancingFont">Meso Notes</h1>
          <Notebook size={60} color={theme.brandColor} weight="duotone" />
        </div>
        <div className="authenticationFieldContainer">
          <div>
            <p>Email</p>
            <input
              type="text"
              placeholder="Email"
              onInput={({ target }) =>
                setUserData({ ...userData, email: target.value })
              }
            />
          </div>
          <div>
            <p>Password</p>
            <input
              type="Password"
              placeholder="Password"
              onInput={({ target }) =>
                setUserData({ ...userData, password: target.value })
              }
            />
            <Link
              style={{
                cursor: "pointer",
                textAlign: "right",
                color: theme.brandColor
              }}
              to="/forgot-password"
            >
              <p> Forgot Password?</p>
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          width="90%"
          height="40px"
          className="primaryButton"
          content={isSigningup ? "Loading...." : "Sign in"}
        />
        <p>
          dont have an account? &nbsp;
          <Link style={{ color: theme.brandColor }} to="/sign-up">
            Sign up
          </Link>
        </p>
      </form>
      {message && (
        <Toast
          content={message}
          cancelContent="close"
          toastCancelEvent={closeToast}
          type="message"
        />
      )}
    </section>
  );
}
