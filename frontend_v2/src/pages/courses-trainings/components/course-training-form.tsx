import { courseTrainingSchema } from '../data/schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useCourseTrainingService from '@/services/course-training-service'
import { Button } from '@/components/custom/button'
import { useEffect } from 'react'
import { CourseTraining } from '@/models/course-training'
import moment from 'moment'
import { CourseTrainingFormValues } from '../data/schema'

interface FormProps {
  defaultValues?: CourseTraining
}

export const CourseTrainingForm = ({ defaultValues }: FormProps) => {
  const form = useForm<CourseTrainingFormValues>({
    resolver: zodResolver(courseTrainingSchema),
    defaultValues: defaultValues ?? {
      title: '',
      description: '',
      start_date: moment().format('YYYY-MM-DDTHH:mm'),
      end_date: moment().add(1, 'day').format('YYYY-MM-DDTHH:mm'),
      total_hours: 8,
    },
    mode: 'onChange',
  })

  const { reset } = form

  const { saveCourseTraining, isLoading } = useCourseTrainingService()

  const onSubmit = async (data: CourseTrainingFormValues) => {
    const formData = {
      ...(defaultValues?.id ? { ...data, id: defaultValues.id } : data),
    }
    return await saveCourseTraining(formData)
  }

  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        start_date: moment(defaultValues?.start_date).format(
          'YYYY-MM-DDTHH:mm'
        ),
        end_date: moment(defaultValues?.end_date).format('YYYY-MM-DDTHH:mm'),
      })
    }
  }, [defaultValues, reset])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6 px-12 pt-4'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título:</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição:</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='total_hours'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Horas:</FormLabel>
              <FormControl>
                <Input type='number' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='start_date'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data Início:</FormLabel>
              <FormControl>
                <Input
                  type='datetime-local'
                  {...field}
                  value={
                    field.value
                      ? typeof field.value === 'string'
                        ? field.value
                        : moment(field.value).format('YYYY-MM-DDTHH:mm')
                      : ''
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='end_date'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data Término:</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='datetime-local'
                  value={
                    field.value
                      ? typeof field.value === 'string'
                        ? field.value
                        : moment(field.value).format('YYYY-MM-DDTHH:mm')
                      : ''
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' loading={isLoading}>
          Salvar Curso/Formação
        </Button>
      </form>
    </Form>
  )
}
