import { ListProps } from "../../utils/data";

const List = ({ children }: ListProps) => {
  return <li className="nav-item">{children}</li>;
};

export default List;
