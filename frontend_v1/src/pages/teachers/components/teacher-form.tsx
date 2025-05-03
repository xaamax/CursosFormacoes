import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useTeacherService from "@/services/teacherService";
import { Teacher } from "@/models/teacher";
import { useEffect } from "react";
import "@/common/form/style.css";

interface FormProps {
  defaultValues: Teacher | null;
}

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "(*) Campo obrigatório" })
    .min(3, { message: "(*) Mínimo 3 caracteres" }),
  email: z
    .string()
    .min(1, { message: "(*) Campo obrigatório" })
    .email({ message: "(*) E-mail inválido" }),
  school: z
    .string()
    .min(1, {
      message: "(*) Campo obrigatório",
    })
    .min(3, {
      message: "(*) Mínimo 3 caracteres",
    }),
  school_class: z
    .string()
    .min(1, {
      message: "(*) Campo obrigatório",
    })
    .min(3, {
      message: "(*) Mínimo 3 caracteres",
    }),
});

export const TeacherForm = ({ defaultValues }: FormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      name: "",
      email: "",
      school: "",
      school_class: "",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues); // Atualiza os valores do formulário quando defaultValues mudar
    }
  }, [defaultValues, reset]);

  const { saveTeacher } = useTeacherService();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    return await saveTeacher({...data, id: defaultValues?.id });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-content">
      <div className="form-group">
      <label>Nome:</label>
        <input
          id="name"
          type="text"
          placeholder="Nome"
          {...register("name")}
          className={errors.name ? "error" : ""}
          />
        {errors.name && (
          <div className="error-message">{errors.name.message}</div>
        )}
      </div>
      <div className="form-group">
        <label>E-mail:</label>
        <input
          id="email"
          type="email"
          placeholder="E-mail"
          {...register("email")}
          className={errors.email ? "error" : ""}
          />
        {errors.email && (
          <div className="error-message">{errors.email.message}</div>
        )}
      </div>
      <div className="form-group">
          <label>Escola:</label>
        <input
          id="school"
          type="text"
          placeholder="Escola"
          {...register("school")}
          className={errors.school ? "error" : ""}
          />
        {errors.school && (
          <div className="error-message">{errors.school.message}</div>
        )}
      </div>
      <div className="form-group">
        <label>Turma:</label>
        <input
          id="school_class"
          type="text"
          placeholder="Turma"
          {...register("school_class")}
          className={errors.school_class ? "error" : ""}
        />
        {errors.school_class && (
          <div className="error-message">{errors.school_class.message}</div>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
};

export default TeacherForm;
