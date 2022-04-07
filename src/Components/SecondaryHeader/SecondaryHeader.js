import "./SecondaryHeader.css";
import { KeyReturn } from "phosphor-react";
import { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { useNavigate } from "react-router-dom";

export function SecondaryHeader({
  backButton = "show",
  text,
  className = "noteHeaderText",
  hasBorderBottom
}) {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  return (
    <div
      className="SecondaryHeader"
      style={{
        borderBottom: hasBorderBottom && `solid 8px ${theme.depthColor}`
      }}
    >
      <p className={className}>{text}</p>
      {backButton && (
        <KeyReturn
          className="touchableOpacity"
          size={60}
          color={theme.brandColor}
          weight="duotone"
          onClick={() => navigate(-1)}
        />
      )}
    </div>
  );
}
