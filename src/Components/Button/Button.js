import "./Button.css";
import { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
export function Button({
  content,
  width,
  height,
  event,
  type,
  fontSize = "16px",
  fontWeight = "500",
  className = "primaryButton"
}) {
  const { theme } = useContext(ThemeContext);

  return (
    <button
      className={className}
      style={{
        width: width,
        height: height,
        fontSize: fontSize,
        fontWeight: fontWeight,
        backgroundImage:
          className === "primaryButton"
            ? ` radial-gradient(
          100% 100% at 100% 0,
          ${theme.brandColor},
          ${theme.brandColor} 100%)`
            : ` radial-gradient(
            100% 100% at 100% 0,
            #fff,
           #fff 100%)`
      }}
      onClick={event}
      type={type}
    >
      {content}
    </button>
  );
}
