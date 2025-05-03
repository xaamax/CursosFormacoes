import { z } from 'zod'

export const teacherSchema = z.object({
  name: z
    .string()
    .min(1, { message: '(*) Campo obrigatório' })
    .min(3, { message: '(*) Mínimo 3 caracteres' }),
  email: z
    .string()
    .min(1, { message: '(*) Campo obrigatório' })
    .email({ message: '(*) E-mail inválido' }),
  school: z
    .string()
    .min(1, {
      message: '(*) Campo obrigatório',
    })
    .min(3, {
      message: '(*) Mínimo 3 caracteres',
    }),
  school_class: z
    .string()
    .min(1, {
      message: '(*) Campo obrigatório',
    })
    .min(3, {
      message: '(*) Mínimo 3 caracteres',
    }),
})
export type TeacherFormValues = z.infer<typeof teacherSchema>

export const teacherListSchema = z.array(teacherSchema)
