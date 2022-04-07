import { useContext, useEffect, useRef, useState } from "react";
import { useId } from "../../Hooks/useId/useId";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { NoteContext } from "../../Context/NoteContext/NoteContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../Components/Button/Button";
import "./EditNote.css";
import { Toast } from "../../Components/Toast/Toast";
import { useLocalStorage } from "../../Hooks/useLocalStorage/useLocalStorage";
import { SecondaryHeader } from "../../Components/SecondaryHeader/SecondaryHeader";

export function EditNote() {
  const { noteId } = useParams();
  const { setNotes, notes } = useContext(NoteContext);
  const { theme } = useContext(ThemeContext);
  const { id } = useId();
  const { SetLocalStorage } = useLocalStorage();
  const [tags, setTags] = useState([]);
  const [uniqueTags, setUniqueTags] = useState([]);
  const [message, setMessage] = useState(null);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const currentDate = new Date();
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const [newNote, setNewNote] = useState({
    noteTitle: null,
    noteBody: null,
    noteTags: uniqueTags,
    noteDate: `${month} ${day} ${year}`,
    id: id
  });
  const navigate = useNavigate();
  const inputRef = useRef();
  const addNewTag = (e) => {
    if (e.target.value.includes(",")) {
      setTags([...tags, e.target.value]);
      setNewNote({ ...newNote, noteTags: tags });
      inputRef.current.value = "";
    }
  };
  useEffect(() => {
    setUniqueTags([...new Set(tags)]);
  }, [tags]);
  const addNewNote = (e) => {
    e.preventDefault();
    if (!newNote.noteTitle || !newNote.noteBody || !newNote.noteTags) {
      setMessage(
        "Hey buddy!, you are trying to create a new note, but it seems you are missing an input field"
      );
    } else {
      // get the current note index
      const noteToUpdateIndex = notes.findIndex(
        (note) => note.id === noteId.replace(":", "")
      );
      // 1. Make a shallow copy of initial Notes
      let temporaryNotes = [...notes];
      // 2. Make a shallow copy of the note to edit
      let tempNote = { ...temporaryNotes[noteToUpdateIndex] };
      // 3. Update the property you're interested in
      tempNote = newNote;
      // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
      temporaryNotes[noteToUpdateIndex] = tempNote;
      // 5. Set the state to our new copy
      setNotes(temporaryNotes);
      // 6 After update the notes save it to Storage
      SetLocalStorage("notes", temporaryNotes);
      // 7 Then Navigate to Home Page
      navigate("/");
    }
  };
  const filterNoteToEdit = notes.filter(
    (note) => note.id === noteId.replace(":", "")
  );
  const noteToEdit = filterNoteToEdit[0];
  return (
    <section className="CreateNote Page">
      <SecondaryHeader text="Update Note" hasBorderBottom />
      <div className="formContainer">
        <form
          onSubmit={addNewNote}
          className="newNoteForm"
          style={{ backgroundColor: theme.depthColor }}
        >
          <div className="authenticationFieldContainer">
            <div>
              <p>Title</p>
              <input
                defaultValue={noteToEdit && noteToEdit.noteTitle}
                type="text"
                placeholder="Title"
                onInput={({ target }) =>
                  setNewNote({ ...newNote, noteTitle: target.value })
                }
              />
            </div>
            <div>
              <p>Description</p>
              <textarea
                defaultValue={noteToEdit && noteToEdit.noteBody}
                className="noteBodyField"
                type="text"
                placeholder="Description"
                onInput={({ target }) =>
                  setNewNote({ ...newNote, noteBody: target.value })
                }
              ></textarea>
            </div>
            <div>
              <p>Tags</p>
              <div className="tagsContainer">
                {uniqueTags.map((uniqueTag) => (
                  <span className="tagsOutput" key={uniqueTag}>
                    #{uniqueTag}&nbsp;
                  </span>
                ))}
              </div>
              <input
                ref={inputRef}
                type="text"
                placeholder="update Tags: Press , to add"
                onChange={addNewTag}
              />
            </div>
          </div>

          <Button
            type="submit"
            width="90%"
            height="40px"
            className="primaryButton"
            content="Submit"
          />
          {message && (
            <Toast
              content={message}
              cancelContent="close"
              toastCancelEvent={() => setMessage(null)}
              type="message"
            />
          )}
        </form>
      </div>
    </section>
  );
}
