import { SearchPromptProps } from "../../utils/data";

const SearchPrompt = <E extends React.ElementType = "option">({ searchTerm, as, isLoading, isError }: SearchPromptProps<E>) => {
  const Component = as || "option";
  const alignItems = isLoading ? "flex-end" : "flex-start";
  const fontWeight = isLoading ? "bold" : "normal";
  let searchPrompt = "Keep typing to reveal list";
  let searchState = "";
  if (isLoading) searchState = "Loading ...";
  else if (isError) searchState = "No Match Found";

  return (
    <Component style={{ height: "200px", textAlign: "center", padding: "20px", borderBottomRightRadius: "2px", borderBottomLeftRadius: "2px", borderBottom: "none", fontWeight, backgroundColor: "white", display: "flex", justifyContent: "center", alignItems, fontSize: "16px" }} key={1}>
      {searchTerm.length >= 3 ? `${searchState}` : `${searchPrompt}`}
    </Component>
  );
};

export default SearchPrompt;
