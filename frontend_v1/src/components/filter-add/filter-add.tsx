import { Link } from "react-router-dom";
import "./style.css";

interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  btnLink: {
    title: string;
    path: string;
  };
}

export default function FilterAdd({ btnLink, onChange }: Props) {
  return (
    <div className="search-and-buttons">
      <input
        type="text"
        placeholder="Pesquisar..."
        onChange={onChange}
        aria-label="Pesquisar"
      />
      <Link className="btn-include" to={btnLink.path} type="button">
        {btnLink.title}
      </Link>
    </div>
  );
}
