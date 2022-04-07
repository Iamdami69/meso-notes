import { MagnifyingGlass } from "phosphor-react";
import { useContext, useState } from "react";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { UserContext } from "../../Context/UserContext/UserContext";
import "./Header.css";
export function Header() {
  const { theme } = useContext(ThemeContext);
  const [searchValues, setSearchValues] = useState(null);
  const { user } = useContext(UserContext);
  const searchResult = () => {
    alert(`I'll search for notes with the keyword: ${searchValues}`);
  };
  return (
    <header
      className="header"
      style={{
        backgroundColor: theme.background,
        borderBottom: `solid 8px ${theme.depthColor}`
      }}
    >
      <div className="headerSearch">
        <input
          type=""
          placeholder="search for notes"
          onInput={(e) => setSearchValues(e.target.value)}
        />
        <MagnifyingGlass
          onClick={searchResult}
          size={40}
          color={theme.brandColor}
          weight="duotone"
        />
      </div>
      <h1>{user.displayName}</h1>
    </header>
  );
}
