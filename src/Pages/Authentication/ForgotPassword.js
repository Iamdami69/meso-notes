import { useContext, useState } from "react";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { UserContext } from "../../Context/UserContext/UserContext";
import { Notebook } from "phosphor-react";
import { Button } from "../../Components/Button/Button";
import { Toast } from "../../Components/Toast/Toast";
import { Link } from "react-router-dom";
import "./Authentication.css";
export function ForgotPassword() {
  const { theme } = useContext(ThemeContext);
  const [userData, setUserData] = useState({
    email: null
  });
  const {
    setIsSigningup,
    isSigningup,
    message,
    setMessage,
    forgotPassword
  } = useContext(UserContext);
  const closeToast = () => {
    setMessage(null);
    setIsSigningup(false);
  };

  return (
    <section className="Signup Page AuthenticationPage">
      <form
        onSubmit={(e) => forgotPassword(e, userData)}
        style={{ backgroundColor: theme.depthColor }}
        className="authenticationPageForm "
      >
        <div className="authenticationFormHeader">
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
        </div>

        <Button
          type="submit"
          width="90%"
          height="40px"
          className="primaryButton"
          content={isSigningup ? "Loading...." : "Sign in"}
        />
        <p>
          remembered your password? &nbsp;
          <Link style={{ color: theme.brandColor }} to="/sign-in">
            Sign in
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
