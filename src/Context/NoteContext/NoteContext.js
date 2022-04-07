import { createContext, useState } from "react";
import { useLocalStorage } from "../../Hooks/useLocalStorage/useLocalStorage";

export const NoteContext = createContext();

export function NoteContextProvider({ children }) {
  const { GetLocalStorage, SetLocalStorage } = useLocalStorage();
  const [notes, setNotes] = useState(GetLocalStorage("notes") ?? []);
  const [message, setMessage] = useState(null);

  const confirmDeleteNote = (user, note) => {
    setMessage(
      `Hey ${user.displayName} you are about to delete the note with an title of ${note.noteTitle}`
    );
    SetLocalStorage("noteId", note.id);
  };
  const deleteNote = () => {
    const id = GetLocalStorage("noteId");
    const newNote = notes.filter((note) => note.id !== id);
    SetLocalStorage("notes", newNote);
    setNotes(newNote);
    setMessage(null);
  };

  return (
    <NoteContext.Provider
      value={{
        deleteNote,
        setMessage,
        message,
        confirmDeleteNote,
        notes,
        setNotes
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}
