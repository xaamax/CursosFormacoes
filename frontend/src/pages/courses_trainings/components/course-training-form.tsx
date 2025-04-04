import { useEffect } from "react";
import { z } from "zod";
import moment from "moment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useCourseTrainingService from "@/services/courseTrainingService";
import { CourseTraining } from "@/models/course-training";
import "@/common/form/style.css";

interface FormProps {
  defaultValues: CourseTraining | null;
}

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "(*) Campo obrigatório" })
    .min(3, { message: "(*) Mínimo 3 caracteres" }),

  description: z.string(),

  start_date: z
    .union([z.date(), z.string()])
    .refine((value) => moment(value, "YYYY-MM-DDTHH:mm", true).isValid(), {
      message: "(*) Data inválida",
    })
    .refine((value) => moment(value).isSameOrAfter(moment(), "day"), {
      message: "(*) Não pode ser menor que a data atual",
    }),

  end_date: z
    .union([z.date(), z.string()])
    .refine((value) => moment(value, "YYYY-MM-DDTHH:mm", true).isValid(), {
      message: "(*) Data inválida",
    })
    .refine((value) => moment(value).isSameOrAfter(moment(), "day"), {
      message: "(*) Não pode ser menor que a data atual",
    }),

  total_hours: z.coerce
    .number()
    .min(1, "(*) Mínimo 1 hora")
    .max(8, "(*) Máximo 8 horas"),
});

export const CourseTrainingForm = ({ defaultValues }: FormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      title: "",
      description: "",
      start_date: moment().format("DD/MM/YYYY hh:mm"),
      end_date: moment(new Date()).add(1, "month").format("DD/MM/YYYY hh:mm"),
      total_hours: 8,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        start_date: moment(defaultValues?.start_date).format(
          "YYYY-MM-DDThh:mm"
        ),
        end_date: moment(defaultValues?.end_date).format("YYYY-MM-DDThh:mm"),
      });
    }
  }, [defaultValues, reset]);

  const { saveCourseTraining } = useCourseTrainingService();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    return await saveCourseTraining({ ...data, id: defaultValues?.id });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-content">
      <div className="form-group">
        <label>Título:</label>
        <input
          id="title"
          type="text"
          placeholder="Título"
          {...register("title")}
          className={errors.title ? "error" : ""}
        />
        {errors.title && (
          <div className="error-message">{errors.title.message}</div>
        )}
      </div>
      <div className="form-group">
        <label>Descrição:</label>
        <textarea
          id="description"
          placeholder="Descrição..."
          {...register("description")}
          className={errors.description ? "error" : ""}
        />
        {errors.description && (
          <div className="error-message">{errors.description.message}</div>
        )}
      </div>
      <div className="form-group">
        <label>Data Início:</label>
        <input
          id="start_date"
          type="datetime-local"
          {...register("start_date")}
          className={errors.start_date ? "error" : ""}
        />
        {errors.start_date && (
          <div className="error-message">{errors.start_date.message}</div>
        )}
      </div>
      <div className="form-group">
        <label>Data Final:</label>
        <input
          id="end_date"
          type="datetime-local"
          placeholder="Escola"
          {...register("end_date")}
          className={errors.end_date ? "error" : ""}
        />
        {errors.end_date && (
          <div className="error-message">{errors.end_date.message}</div>
        )}
      </div>
      <div className="form-group">
        <label>Total Horas:</label>
        <input
          id="total_hours"
          type="number"
          placeholder="Total Horas"
          {...register("total_hours")} //Garante que será um número
          className={errors.total_hours ? "error" : ""}
        />
        {errors.total_hours && (
          <div className="error-message">{errors.total_hours.message}</div>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
};

export default CourseTrainingForm;
