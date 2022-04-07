import "./Sidebar.css";
import { useContext, useState } from "react";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { UserContext } from "../../Context/UserContext/UserContext";
import { NoteContext } from "../../Context/NoteContext/NoteContext";
import {
  Moon,
  Sun,
  SignOut,
  HouseLine,
  BookOpen,
  Notebook,
  Trash
} from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../Hooks/useLocalStorage/useLocalStorage";
import { Toast } from "../Toast/Toast";
export default function Sidebar() {
  const { GetLocalStorage } = useLocalStorage();
  const { theme, isLight, toggleTheme } = useContext(ThemeContext);
  const { user, logOut } = useContext(UserContext);
  const { setNotes, notes } = useContext(NoteContext);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const goToRecentlyReading = () => {
    // check if the id in localstorage match the id of any note
    const filterNoteToRead = notes.filter(
      (note) => note.id === GetLocalStorage("noteId")
    );
    if (!GetLocalStorage("noteId") || !filterNoteToRead[0]) {
      setMessage(
        `Hello ${user.displayName}, You are trying to access your recent readings, However you currently haven't read any note yet \n Or you probably might have deleted the note you were previously reading, please try clicking on a note menu and click on read to have notes stored in memory. Thanks`
      );
    } else {
      navigate(`/read-note/:${GetLocalStorage("noteId")}`);
    }
  };
  const deleteNotes = () => {
    if (window.confirm("Delete all Notes?")) {
      localStorage.clear();
      setNotes([]);
      navigate("/");
    }
  };
  return (
    <>
      {user && (
        <section
          className="Sidebar "
          style={{ borderRight: `solid 3px ${theme.depthColor}` }}
        >
          <img
            className="userPicturePart"
            src={user && user.photoURL}
            alt={user.displayName}
          />
          {isLight && (
            <Moon
              className="hasPointerCursor"
              size={40}
              color={theme.brandColor}
              weight="duotone"
              onClick={toggleTheme}
            />
          )}
          {!isLight && (
            <Sun
              className="hasPointerCursor"
              size={40}
              color={theme.brandColor}
              weight="duotone"
              onClick={toggleTheme}
            />
          )}
          <HouseLine
            size={40}
            onClick={() => navigate("/")}
            color={theme.brandColor}
            weight="duotone"
          />
          <Notebook
            onClick={() => navigate("/create-note")}
            size={40}
            color={theme.brandColor}
            weight="duotone"
          />
          <BookOpen
            size={40}
            onClick={goToRecentlyReading}
            color={theme.brandColor}
            weight="duotone"
          />
          <Trash
            size={40}
            onClick={deleteNotes}
            color={theme.brandColor}
            weight="duotone"
          />
          <SignOut
            className="hasPointerCursor"
            size={40}
            color={theme.brandColor}
            weight="duotone"
            onClick={logOut}
          />
          {message && (
            <Toast
              content={message}
              okayContent="Alright Thanks"
              toastOkayEvent={() => setMessage(null)}
              type="message"
            />
          )}
        </section>
      )}
      {!user && (
        <section
          className="NoUserSideBar "
          style={{ borderRight: `solid 3px ${theme.depthColor}` }}
        >
          {isLight && (
            <Moon
              className="hasPointerCursor"
              size={40}
              color={theme.brandColor}
              weight="duotone"
              onClick={toggleTheme}
            />
          )}
          {!isLight && (
            <Sun
              className="hasPointerCursor"
              size={40}
              color={theme.brandColor}
              weight="duotone"
              onClick={toggleTheme}
            />
          )}
        </section>
      )}
    </>
  );
}
