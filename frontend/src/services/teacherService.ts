import { useState, useCallback } from "react";
import { useToast } from "@/components/toast";
import api from "./api";
import { Teacher } from "@/models/teacher";
import { useNavigate } from "react-router-dom";
import { useSwal } from "@/hooks/sweet-alert";

const useTeacherService = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const swal = useSwal();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState();

  const getAllTeachers = useCallback(async () => {
    setIsLoading(true);
    return await api
      .get(`${import.meta.env.VITE_API_TEACHER}`)
      .then((res) => {
        setResponse(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        toast({
          title: "Erro",
          description: err.message,
          variant: "destructive",
        });
      });
  }, [toast]);

  const getTeacherDetails = useCallback(
    async (id: number) => {
      setIsLoading(true);
      try {
        const response = await api.get(
          `${import.meta.env.VITE_API_TEACHER}/${id}`
        );
        setIsLoading(false);
        return response.data;
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Ocorreu um erro inesperado.";
        setIsLoading(false);
        toast({
          title: "Erro",
          description: errorMessage,
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  const saveTeacher = useCallback(
    async (teacher: Teacher) => {
      try {
        setIsLoading(true);
        const method = teacher.id ? "put" : "post";
        await api[method](`${import.meta.env.VITE_API_TEACHER}`, teacher);
        swal.fire({
          title: "Sucesso!",
          text: "Os dados foram salvos.",
          icon: "success",
        }).then(() => navigate("/professores"));
      } catch (error) {
        const errorMessage =
        error instanceof Error
          ? error.message
          : "Ocorreu um erro inesperado.";
        setIsLoading(false);
        swal.fire({
          title: "Erro",
          text: errorMessage,
          icon: "error",
        });
      }
      setIsLoading(false);
    },
    [navigate, toast]
  );

  const deleteTeacher = useCallback(
    async (id: number) => {
      setIsLoading(true);
      await api.delete(`${import.meta.env.VITE_API_TEACHER}/${id}`).then(() => {
        swal.fire({
          title: "Sucesso!",
          text: "Registro excluído.",
          icon: "success",
        });
        getAllTeachers();
      });
      setIsLoading(false);
    },
    [swal]
  );

  return {
    getAllTeachers,
    getTeacherDetails,
    isLoading,
    saveTeacher,
    deleteTeacher,
    response,
  };
};

export default useTeacherService;
