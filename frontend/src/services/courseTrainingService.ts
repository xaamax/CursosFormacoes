import { useState, useCallback } from "react";
import { useToast } from "@/components/toast";
import api from "./api";
import { CourseTraining } from "@/models/course-training";
import { useNavigate } from "react-router-dom";
import { useSwal } from "@/hooks/sweet-alert";

const useCourseTrainingService = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const swal = useSwal();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState();

  const getAllCourseTrainings = useCallback(async () => {
    setIsLoading(true);
    return await api
      .get(`${import.meta.env.VITE_API_COURSE_TRAINING}`)
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

  const getCourseTrainingDetails = useCallback(
    async (id: number) => {
      setIsLoading(true);
      try {
        const response = await api.get(
          `${import.meta.env.VITE_API_COURSE_TRAINING}/${id}`
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

  const saveCourseTraining = useCallback(
    async (courseTraining: CourseTraining) => {
      try {
        setIsLoading(true);
        const method = courseTraining.id ? "put" : "post";
        await api[method](`${import.meta.env.VITE_API_COURSE_TRAINING}`, courseTraining);
        swal.fire({
          title: "Sucesso!",
          text: "Os dados foram salvos.",
          icon: "success",
        }).then(() => navigate("/cursos-formacoes"));
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

  const deleteCourseTraining = useCallback(
    async (id: number) => {
      setIsLoading(true);
      await api.delete(`${import.meta.env.VITE_API_COURSE_TRAINING}/${id}`).then(() => {
        swal.fire({
          title: "Sucesso!",
          text: "Registro excluído.",
          icon: "success",
        });
        getAllCourseTrainings();
      });
      setIsLoading(false);
    },
    [swal]
  );

  return {
    getAllCourseTrainings,
    getCourseTrainingDetails,
    isLoading,
    saveCourseTraining,
    deleteCourseTraining,
    response,
  };
};

export default useCourseTrainingService;
