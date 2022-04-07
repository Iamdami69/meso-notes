import React, { useContext } from "react";
import { Button } from "../Button/Button";
import { Bug, WarningOctagon, ChatCenteredText } from "phosphor-react";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import "./Toast.css";
export function Toast({
  content,
  type,
  toastOkayEvent,
  okayContent,
  toastCancelEvent,
  cancelContent,
  isInOneLine
}) {
  const { theme } = useContext(ThemeContext);
  return (
    <section className="Toast Page">
      <div
        className="toastContainer"
        style={{ backgroundColor: theme.depthColor }}
      >
        <>
          {type === "error" && (
            <>
              <Bug size={40} color={theme.brandColor} weight="duotone" />
            </>
          )}
          {type === "warning" && <>Warning Icon</>}
          {type === "danger" && (
            <>
              <WarningOctagon
                size={40}
                color={theme.brandColor}
                weight="duotone"
              />
            </>
          )}
          {type === "message" && (
            <>
              <ChatCenteredText
                size={40}
                color={theme.brandColor}
                weight="duotone"
              />
            </>
          )}
          <p style={{ textAlign: "center", color: theme.primaryColorTwo }}>
            {content}
          </p>
        </>
        <div
          className="toastButtonContainer"
          style={{
            width: "100%",
            display: isInOneLine ? "flex" : "block",
            justifyContent: isInOneLine ? "space-around" : "unset",
            alignItems: isInOneLine ? "center" : "unset"
          }}
        >
          {cancelContent && (
            <Button
              width={isInOneLine ? "40%" : "100%"}
              height="40px"
              content={cancelContent}
              event={toastCancelEvent}
              className="secondaryButton"
            />
          )}
          {okayContent && (
            <Button
              content={okayContent}
              width={isInOneLine ? "40%" : "100%"}
              height="40px"
              event={toastOkayEvent}
              className="primaryButton"
            />
          )}
        </div>
      </div>
    </section>
  );
}
