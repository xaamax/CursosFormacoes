import { UserAuthForm } from './components/user-auth-form'
export default function SignIn() {
  return (
    <>
      <div className='container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <div className='relative hidden h-full flex-col bg-muted text-white dark:border-r lg:flex'>
          <div className='absolute inset-0 bg-zinc-900' />
          <img
            src='https://img.freepik.com/fotos-gratis/vista-frontal-de-livros-empilhados-um-chapeu-de-formatura-e-um-diploma-para-o-dia-da-educacao_23-2149241011.jpg?ga=GA1.1.1898111965.1742185390&semt=ais_hybrid'
            className='relative h-full'
          />
        </div>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-left'>
              <h1 className='text-2xl font-semibold tracking-tight'>
                SME | Cursos e Formações
              </h1>
              <p className='text-sm text-muted-foreground'>
                Insira seu usário e senha abaixo para acessar.
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  )
}
