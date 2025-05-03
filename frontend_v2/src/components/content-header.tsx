interface ContentHeaderProps {
  title: string
}

export function ContentHeader({ title }: ContentHeaderProps) {
  return (
    <div className='mb-2 flex items-center justify-between space-y-2'>
      <h1 className='text-2xl font-bold tracking-tight'>{title}</h1>
    </div>
  )
}
