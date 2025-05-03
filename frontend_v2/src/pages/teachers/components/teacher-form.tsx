import { TeacherFormValues, teacherSchema } from '../data/schema'
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
import useTeacherService from '@/services/teacher-service'
import { Button } from '@/components/custom/button'
import { useEffect } from 'react'
import { Teacher } from '@/models/teacher'


interface FormProps {
  defaultValues?: Teacher
}

export const TeacherForm = ({ defaultValues }: FormProps) => {
  const form = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherSchema),
    defaultValues: defaultValues ?? {
      name: '',
      email: '',
      school: '',
      school_class: ''
    },
    mode: 'onChange',
  })

  const { reset } = form

  const { saveTeacher, isLoading } = useTeacherService()

  const onSubmit = async (data: TeacherFormValues) => {
    const formData = {
        ...(defaultValues?.id ? { ...data, id: defaultValues.id } : data)
    };
    return await saveTeacher(formData);
  };

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues)
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
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome:</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail:</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='school'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Escola:</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='school_class'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Turma:</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' loading={isLoading}>
          Salvar Professor
        </Button>
      </form>
    </Form>
  )
}
