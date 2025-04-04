import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/auth-provider";
import axios from "axios";
import { useSwal } from "@/hooks/sweet-alert";

const useUserService = () => {
  const { login } = useAuth();
  const swal = useSwal();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = useCallback(async (username: string, password: string) => {
    setIsLoading(true);
    const response = await axios
      .post(`${import.meta.env.VITE_API_URL}/auth/signin`, {
        username,
        password,
      })
      .then((resp) => {
        const { accessToken } = resp.data;
        login(accessToken);
        swal
          .fire({
            title: "Usuário autenticado!",
            text: "Bem vindo(a)!",
            icon: "success",
          })
          .then(() => navigate("/"));
      })
      .catch(() =>
        swal
          .fire({
            title: "Ops!",
            text: "Usuário/Senha inválidos.",
            icon: "error",
          })
          .then(() => navigate("/"))
      );
    setIsLoading(false);
    return response;
  }, []);

  return { signIn, isLoading };
};

export default useUserService;
