import LogoSME from "@/assets/logo.png";
import "./style.css";
import { AuthForm } from "./components/auth-form";

function SignIn() {
  return (
    <div className="login-page">
        <img src={LogoSME} />
        <AuthForm />
    </div>
  );
}

export default SignIn;
