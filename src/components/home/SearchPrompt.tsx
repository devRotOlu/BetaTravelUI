import { SearchPromptProps } from "../../utils/data";

const SearchPrompt = ({ searchTerm }: SearchPromptProps) => {
  return (
    <option style={{ height: "230px", textAlign: "center", paddingTop: "20px", borderBottomRightRadius: "2px", borderBottomLeftRadius: "2px", borderBottom: "none", fontWeight: "normal" }} key={1}>
      {searchTerm.length >= 3 ? "" : "Keep typing to reveal list"}
    </option>
  );
};

export default SearchPrompt;
