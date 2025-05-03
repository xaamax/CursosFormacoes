import { useState, useCallback } from "react";
import { useToast } from "@/components/toast";
import api from "./api";
import { CourseRegistration } from "@/models/course-registration";
import { useNavigate } from "react-router-dom";
import { useSwal } from "@/hooks/sweet-alert";
import { Teacher } from "@/models/teacher";
import { CourseTraining } from "@/models/course-training";
import axios from "axios";

const useCourseRegistrationService = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const swal = useSwal();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState();

  const getAllTeachersCourseTrainings = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await api.get<{
        teachers: Teacher[];
        courses_trainings: CourseTraining[];
      }>(
        `${
          import.meta.env.VITE_API_COURSE_REGISTRATION
        }/teachers_courses_trainings`
      );
      return res.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Ocorreu um erro inesperado.";
      swal.fire({
        title: "Erro",
        text: errorMessage,
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const getAllCourseRegistrations = useCallback(async () => {
    setIsLoading(true);
    return await api
      .get(`${import.meta.env.VITE_API_COURSE_REGISTRATION}`)
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

  const getCourseRegistrationDetails = useCallback(
    async (id: number) => {
      setIsLoading(true);
      try {
        const response = await api.get(
          `${import.meta.env.VITE_API_COURSE_REGISTRATION}/${id}`
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

  const saveCourseRegistration = useCallback(
    async (courseRegistration: CourseRegistration) => {
      try {
        setIsLoading(true);
        const method = courseRegistration.id ? "patch" : "post";
        const baseUrl = `${import.meta.env.VITE_API_COURSE_REGISTRATION}/${
          courseRegistration.id ? `${courseRegistration.id}/progress` : ""
        }`;
        const formData = {
          ...(courseRegistration.id
            ? { progress: courseRegistration.progress }
            : courseRegistration),
        };
        await api[method](baseUrl, formData);
        swal
          .fire({
            title: "Sucesso!",
            text: "Os dados foram salvos.",
            icon: "success",
          })
          .then(() => navigate("/inscricoes"));
      } catch (error) {
        const errorMessage = axios.isAxiosError(error)
          ? error.response?.data?.message ?? error.message
          : "Erro ao processar";
        swal.fire({
          title: "Erro",
          text: errorMessage,
          icon: "error",
        });
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    },
    [navigate, toast]
  );

  const deleteCourseRegistration = useCallback(
    async (id: number) => {
      setIsLoading(true);
      await api
        .delete(`${import.meta.env.VITE_API_COURSE_REGISTRATION}/${id}`)
        .then(() => {
          swal.fire({
            title: "Sucesso!",
            text: "Registro excluído.",
            icon: "success",
          });
          getAllCourseRegistrations();
        });
      setIsLoading(false);
    },
    [swal]
  );

  return {
    getAllTeachersCourseTrainings,
    getAllCourseRegistrations,
    getCourseRegistrationDetails,
    isLoading,
    saveCourseRegistration,
    deleteCourseRegistration,
    response,
  };
};

export default useCourseRegistrationService;
