import { z } from 'zod'
import moment from "moment";

export const courseTrainingSchema = z.object({
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
})
export type CourseTrainingFormValues = z.infer<typeof courseTrainingSchema>

export const courseTrainingListSchema = z.array(courseTrainingSchema)
