import { IconBook, IconFileCertificate, IconLayoutDashboard, IconUsers } from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/dashboard',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Professores',
    label: '',
    href: '/professores',
    icon: <IconUsers size={18} />,
  },
  {
    title: 'Cursos / Formações',
    label: '',
    href: '/cursos-formacoes',
    icon: <IconBook size={18} />,
  },
  {
    title: 'Inscrições',
    label: '',
    href: '/inscricoes',
    icon: <IconFileCertificate size={18} />,
  },
]
