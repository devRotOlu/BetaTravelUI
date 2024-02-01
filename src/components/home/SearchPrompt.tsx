import { SearchPromptProps } from "../../utils/data";

const SearchPrompt = <E extends React.ElementType = "option">({ searchTerm, as, isLoading, isTyping, isError }: SearchPromptProps<E>) => {
  const Component = as || "option";
  const alignItems = isLoading ? "flex-end" : "flex-start";
  const fontWeight = isLoading ? "bold" : "normal";
  let content = "Keep typing to reveal list";
  if (isLoading) content = "Loading ...";
  else if (isError) content = "No Match";

  return (
    <Component style={{ height: "200px", textAlign: "center", padding: "20px", borderBottomRightRadius: "2px", borderBottomLeftRadius: "2px", borderBottom: "none", fontWeight, backgroundColor: "white", display: "flex", justifyContent: "center", alignItems, fontSize: "16px" }} key={1}>
      {searchTerm.length >= 3 ? "" : `${content}`}
    </Component>
  );
};

export default SearchPrompt;
