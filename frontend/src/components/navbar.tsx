import { useAuth } from "@/providers/auth-provider";
import { Link } from "react-router-dom";

function Navbar() {
  const { logout } = useAuth()

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/professores">Professores</Link>
      <Link to="/cursos-formacoes">Cursos/Formações</Link>
      <Link to="/inscricoes">Inscrições</Link>
      <Link to="/sair" onClick={() => logout()}>Sair</Link>
    </nav>
  );
}

export default Navbar;
