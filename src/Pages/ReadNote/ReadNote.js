import { useContext } from "react";
import { useParams } from "react-router-dom";
import { SecondaryHeader } from "../../Components/SecondaryHeader/SecondaryHeader";
import { NoteContext } from "../../Context/NoteContext/NoteContext";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { UserContext } from "../../Context/UserContext/UserContext";
import "./ReadNote.css";
export function ReadNote() {
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const { noteId } = useParams();
  const { notes } = useContext(NoteContext);
  const filterNoteToRead = notes.filter(
    (note) => note.id === noteId.replace(":", "")
  );
  const noteToRead = filterNoteToRead[0];
  return (
    <section className="ReadNote Page">
      <SecondaryHeader
        hasBorderBottom
        className="readNoteHeaderText"
        text={`Note > ${noteToRead.noteTitle}`}
      />
      <div
        className="noteInformation"
        style={{ borderBottom: `solid 4px ${theme.depthColor}` }}
      >
        <h1 className="noteInformationHeading">{noteToRead.noteTitle}</h1>
        <div className="noteIinformationCreatedBy">
          <span className="noteInformationFirstChild">Created by :</span>{" "}
          <strong>{user.displayName}</strong>
        </div>
        <div className="noteIinformationLastModified">
          <span className="noteInformationFirstChild">Last Modified :</span>
          <strong>{noteToRead.noteDate}</strong>
        </div>
        <div className="noteIinformationTags">
          <span className="noteInformationFirstChild">Tags : </span>
          <div className="div">
            {noteToRead.noteTags.map((tag) => (
              <span
                className="noteIinformationTagstag touchableOpacity"
                style={{ backgroundColor: theme.depthColor }}
              >
                {tag.replace(",", "")}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="noteToReadBody">
        <SecondaryHeader
          text={noteToRead.noteTitle}
          className="noteBodyHeadText"
          backButton={false}
        />
        <p className="noteBodyBodyText">{noteToRead.noteBody}</p>
      </div>
    </section>
  );
}
