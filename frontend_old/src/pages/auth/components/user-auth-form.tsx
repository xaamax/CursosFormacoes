import { HTMLAttributes } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/custom/button'
import { PasswordInput } from '@/components/custom/password-input'
import { cn } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'
import useUserService from '@/services/userService'
import { useAuth } from '@/context/AuthContext'

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  username: z.string().min(1, { message: 'Por favor insira seu usuário' }),
  password: z
    .string()
    .min(1, {
      message: 'Por favor insira sua senha',
    })
    .min(6, {
      message: 'A senha deve ter pelo menos 6 caracteres',
    }),
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const { signIn, isLoading } = useUserService()
  const { login } = useAuth()

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await signIn(data.username, data.password)

      if (response) {
        toast({
          title: 'Login bem-sucedido',
          description: `Bem-vindo(a)!`,
        })
        login()
        setTimeout(() => {
          navigate('/dashboard')
        }, 1000)
      }
    } catch (error) {
      toast({
        title: 'Erro ao Logar',
        description: 'E-mail ou senha inválidos',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormControl>
                    <Input placeholder='Usuário' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormControl>
                    <PasswordInput placeholder='Senha' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' loading={isLoading}>
              Entrar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
