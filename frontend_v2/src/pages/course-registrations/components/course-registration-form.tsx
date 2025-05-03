import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'

import { CourseRegistration } from '@/models/course-registration'
import { CourseTraining } from '@/models/course-training'
import { Teacher } from '@/models/teacher'
import {
  CourseRegistrationFormValues,
  courseRegistrationSchema,
} from '../data/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import useCourseRegistrationService from '@/services/course-registration-service'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select'
import { Button } from '@/components/custom/button'

interface FormProps {
  defaultValues: {
    course_registration?: CourseRegistration | null
    teachers: Teacher[]
    courses_trainings: CourseTraining[]
  }
}

export function CourseRegistrationForm({ defaultValues }: FormProps) {
  const form = useForm<CourseRegistrationFormValues>({
    resolver: zodResolver(courseRegistrationSchema),
    defaultValues: defaultValues.course_registration ?? {
      teacher_id: 0,
      course_training_id: 0,
      ...(defaultValues.course_registration || {}),
    },
  })

  const { reset } = form

  const { saveCourseRegistration, isLoading } = useCourseRegistrationService()

  const onSubmit = async (data: CourseRegistrationFormValues) => {
    return await saveCourseRegistration({
      ...data,
      ...(defaultValues.course_registration?.id && {
        id: defaultValues.course_registration.id,
      }),
    })
  }

  useEffect(() => {
    if (defaultValues.course_registration)
      reset(defaultValues?.course_registration)
  }, [defaultValues.course_registration, reset])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6 px-12 pt-4'
      >
        <FormField
          control={form.control}
          name='teacher_id'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Professor:</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={String(field.value)}
                disabled={!!defaultValues.course_registration?.id}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='--- Selecione ---' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {defaultValues.teachers.map(({ id, name }, i) => (
                    <SelectItem key={i} value={String(id)}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='course_training_id'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Curso/Formação:</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={String(field.value)}
                disabled={!!defaultValues.course_registration?.id}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='--- Selecione ---' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {defaultValues.courses_trainings.map(({ id, title }, i) => (
                    <SelectItem key={i} value={String(id)}>
                      {title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {defaultValues.course_registration?.id && (
          <FormField
            control={form.control}
            name='progress'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Progresso:</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='--- Selecione ---' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='Não iniciado'>Não iniciado</SelectItem>
                    <SelectItem value='Em andamento'>Em andamento</SelectItem>
                    <SelectItem value='Concluído'>Concluído</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type='submit' loading={isLoading}>
          Salvar Inscrição
        </Button>
      </form>
    </Form>
  )
}
