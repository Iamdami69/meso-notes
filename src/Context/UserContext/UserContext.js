import { createContext, useState, useEffect } from "react";
import { auth } from "../../Config/Firebase/Firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from "firebase/auth";
export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState();
  const [message, setMessage] = useState(null);
  const [isSigningup, setIsSigningup] = useState(false);

  const signup = (e, state) => {
    e.preventDefault();
    setIsSigningup(true);
    if (
      !state.username ||
      !state.email ||
      !state.password ||
      !state.profilePicture
    ) {
      setMessage(
        `Hey ${
          state.username ? state.username : " stranger"
        } 👋 it seems you are trying to create  an account but you are still missing an input field. \n  To prevent this error from showing again. Please attend to all input field `
      );
    } else {
      createUserWithEmailAndPassword(auth, state.email, state.password)
        .then(() => {
          return updateProfile(auth.currentUser, {
            displayName: state.username,
            photoURL: state.profilePicture
          });
        })
        .catch((error) => setMessage(error.message));
    }
  };
  const signin = (e, state) => {
    e.preventDefault();
    setIsSigningup(true);

    signInWithEmailAndPassword(
      auth,
      state.email,
      state.password
    ).catch((error) => setMessage(error.message));
  };
  const logOut = async () => {
    await signOut(auth);
    setUser(null);
  };
  const forgotPassword = (e, state) => {
    e.preventDefault();
    setIsSigningup(true);
    !state.email &&
      setMessage(
        "Hey, you need to provide an email to be able to reset your password"
      );
    if (state.email) {
      sendPasswordResetEmail(auth, state.email).catch((error) =>
        setMessage(error.message)
      );
      setMessage(`Email reset link has been sent to the email ${state.email}`);
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (res) => res && setUser(res));
    setMessage(null);
    return unsubscribe;
  }, [user]);
  return (
    <UserContext.Provider
      value={{
        setIsSigningup,
        setMessage,
        isSigningup,
        user,
        message,
        signup,
        logOut,
        signin,
        forgotPassword
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
