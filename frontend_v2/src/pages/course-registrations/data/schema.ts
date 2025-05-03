import { z } from "zod";

export const courseRegistrationSchema = z.object({
    teacher_id: z.coerce
      .number()
      .min(1, { message: "(*) Selecione um professor" }),
  
    course_training_id: z.coerce
      .number()
      .min(1, { message: "(*) Selecione um curso/formação" }),
    progress: z.string().optional(),
  });

  export type CourseRegistrationFormValues = z.infer<typeof courseRegistrationSchema>