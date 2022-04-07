import { useContext, useRef } from "react";
import { NoteContext } from "../../Context/NoteContext/NoteContext";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import {
  DotsThree,
  PlusCircle,
  EnvelopeOpen,
  PencilSimple,
  Trash
} from "phosphor-react";
import "./Homepage.css";
import { Header } from "../../Components/Header/Header";
import { useNavigate } from "react-router-dom";
import { Toast } from "../../Components/Toast/Toast";
import { UserContext } from "../../Context/UserContext/UserContext";
import { useLocalStorage } from "../../Hooks/useLocalStorage/useLocalStorage";
import { SecondaryHeader } from "../../Components/SecondaryHeader/SecondaryHeader";
export default function Homepage() {
  const { SetLocalStorage } = useLocalStorage();
  const {
    deleteNote,
    notes,
    message,
    confirmDeleteNote,
    setMessage
  } = useContext(NoteContext);
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const noteMenu = useRef();
  const openMenu = (e) => {
    e.currentTarget.classList.toggle("showMenu");
  };
  const openContextMenu = (e) => {
    e.preventDefault();
    noteMenu.current.classList.add("showMenu");
  };
  const navigate = useNavigate();
  const readNote = (note) => {
    SetLocalStorage("noteId", note.id);
    navigate(`/read-note/:${note.id}`);
  };
  const editNote = (note) => {
    SetLocalStorage("noteId", note.id);
    navigate(`/edit-note/:${note.id}`);
  };
  return (
    <section className="Homepage Page">
      <Header />
      <SecondaryHeader text="My Notes" backButton={false} />
      <div className="homeContentContainer">
        <div
          onClick={() => navigate("/create-note")}
          className="createNewNoteBox  "
          style={{ backgroundColor: theme.depthColor }}
        >
          <PlusCircle
            className="touchableOpacity"
            size={80}
            color={theme.brandColor}
            weight="duotone"
          />
          <p>Add new note</p>
        </div>
        {notes.map((note) => (
          <div
            onContextMenu={openContextMenu}
            key={note.id}
            className="note"
            style={{ backgroundColor: theme.depthColor }}
          >
            <p className="noteTitle">{note.noteTitle} </p>
            <p className="noteBody">{note.noteBody.substring(0, 220)}...</p>
            <div
              className="noteFooter"
              style={{
                borderTop: `solid 3px ${theme.background}`
              }}
            >
              <div className="noteTagsContainer">
                <p className="tagsOutput">#{note.noteTags[0]}</p>
              </div>
              <div className="noteFooterContent">
                {" "}
                <span>{note.noteDate}</span>
                <div
                  onClick={openMenu}
                  style={{ cursor: "pointer" }}
                  ref={noteMenu}
                >
                  <DotsThree
                    size={40}
                    color={theme.brandColor}
                    weight="duotone"
                    className="touchableOpacity"
                  />
                  <div
                    className="noteMenu hasShadow"
                    style={{ backgroundColor: theme.background }}
                  >
                    <div
                      className="readNote  touchableOpacity"
                      onClick={() => readNote(note)}
                    >
                      <EnvelopeOpen
                        size={20}
                        color={theme.brandColor}
                        weight="duotone"
                      />
                      Read
                    </div>
                    <div
                      className="editNote touchableOpacity"
                      onClick={() => editNote(note)}
                    >
                      <PencilSimple
                        size={20}
                        color={theme.brandColor}
                        weight="duotone"
                      />
                      Edit
                    </div>
                    <div
                      className="deleteNote"
                      onClick={() => confirmDeleteNote(user, note)}
                    >
                      <Trash
                        size={20}
                        color={theme.brandColor}
                        weight="duotone"
                      />{" "}
                      Delete
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {message && (
        <Toast
          isInOneLine={true}
          okayContent="Okay"
          content={message}
          cancelContent="close"
          toastCancelEvent={() => setMessage(null)}
          toastOkayEvent={deleteNote}
          type="message"
        />
      )}
    </section>
  );
}
