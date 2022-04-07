import { useContext, useState } from "react";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { UserContext } from "../../Context/UserContext/UserContext";
import { Notebook } from "phosphor-react";
import { Button } from "../../Components/Button/Button";
import { Toast } from "../../Components/Toast/Toast";
import { Link } from "react-router-dom";
import "./Authentication.css";
export function Signup() {
  const { theme } = useContext(ThemeContext);
  const [userData, setUserData] = useState({
    username: null,
    password: null,
    email: null,
    profilePicture: null
  });
  const {
    signup,
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
        onSubmit={(e) => signup(e, userData)}
        style={{ backgroundColor: theme.depthColor }}
        className="authenticationPageForm "
      >
        <div className="authenticationFormHeader">
          <h1 className="hasDancingFont">Meso Notes</h1>
          <Notebook size={60} color={theme.brandColor} weight="duotone" />
        </div>
        <div className="authenticationFieldContainer">
          <div>
            <p>Display Name</p>
            <input
              type="text"
              placeholder="Display Name"
              onInput={({ target }) =>
                setUserData({ ...userData, username: target.value })
              }
            />
          </div>
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
          </div>
          <div>
            <p>Profile Picture</p>
            <input
              type="file"
              accept="image/*"
              onChange={({ target }) =>
                setUserData({
                  ...userData,
                  profilePicture: window.URL.createObjectURL(target.files[0])
                })
              }
            />
          </div>
        </div>
        <Button
          type="submit"
          width="90%"
          height="40px"
          className="primaryButton"
          content={isSigningup ? "Loading...." : "Sign up"}
        />
        <p>
          already have an account? &nbsp;
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
