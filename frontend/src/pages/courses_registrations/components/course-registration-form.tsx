import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useCourseRegistrationService from "@/services/courseRegistrationService";
import { CourseRegistration } from "@/models/course-registration";
import "@/common/form/style.css";
import { Teacher } from "@/models/teacher";
import { CourseTraining } from "@/models/course-training";

interface FormProps {
  defaultValues: {
    course_registration?: CourseRegistration | null;
    teachers: Teacher[];
    courses_trainings: CourseTraining[];
  };
}

const formSchema = z.object({
  teacher_id: z.coerce
    .number()
    .min(1, { message: "(*) Selecione um professor" }), // Não permite 0

  course_training_id: z.coerce
    .number()
    .min(1, { message: "(*) Selecione um curso/formação" }), // Não permite 0
  progress: z.string().optional(),
});

export const CourseRegistrationForm = ({ defaultValues }: FormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues.course_registration ?? {
      teacher_id: 0,
      course_training_id: 0,
      ...(defaultValues.course_registration || {}),
    },
  });

  useEffect(() => {
    if (defaultValues.course_registration)
      reset(defaultValues?.course_registration);
  }, [defaultValues, reset]);

  const { saveCourseRegistration } = useCourseRegistrationService();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    return await saveCourseRegistration({
      ...data,
      ...(defaultValues.course_registration?.id && {
        id: defaultValues.course_registration.id,
      }),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-content">
      <div className="form-group">
        <label>Professor:</label>
        <select
          id="teacher_id"
          {...register("teacher_id")}
          disabled={!!defaultValues.course_registration?.id}
        >
          <option value={0}>--- Selecione ---</option>
          {defaultValues.teachers.map(({ id, name }, i) => (
            <option key={i} value={id}>
              {name}
            </option>
          ))}
        </select>
        {errors.teacher_id && (
          <div className="error-message">{errors.teacher_id.message}</div>
        )}
      </div>
      <div className="form-group">
        <label>Curso/Formação:</label>
        <select
          id="course_training_id"
          {...register("course_training_id")}
          disabled={!!defaultValues.course_registration?.id}
        >
          <option value={0}>--- Selecione ---</option>
          {defaultValues.courses_trainings.map(({ id, title }, i) => (
            <option key={i} value={id}>
              {title}
            </option>
          ))}
        </select>
        {errors.course_training_id && (
          <div className="error-message">
            {errors.course_training_id.message}
          </div>
        )}
      </div>
      {defaultValues.course_registration?.id && (
        <div className="form-group">
          <label>Progresso:</label>
          <select id="progress" {...register("progress")}>
            <option value="Não iniciado">Não iniciado</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluído">Concluído</option>
          </select>
        </div>
      )}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
};

export default CourseRegistrationForm;
