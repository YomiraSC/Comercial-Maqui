'use client'

import { Users, ListChecks as ListTasks, Mail, MessageSquare, Users2, Calendar, LogOut, DollarSign, Settings } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'

interface SidebarProps {
  activeModule: string
  onModuleChange: (module: any) => void
}

export function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
  const { user, logout } = useAuth()

  const modules = [
    {
      id: 'leads',
      label: 'Leads',
      icon: MessageSquare,
    },
    {
      id: 'tasks',
      label: 'Tareas',
      icon: ListTasks,
    },
    {
      id: 'campaigns',
      label: 'Campañas',
      icon: Mail,
    },
    {
      id: 'calendar',
      label: 'Calendario',
      icon: Calendar,
    },
    {
      id: 'templates',
      label: 'Plantillas',
      icon: Mail,
    },
    {
      id: 'bot-cost',
      label: 'Costo Bot',
      icon: DollarSign,
    },
    {
      id: 'routing-rules',
      label: 'Reglas Enrutamiento',
      icon: Settings,
    },
    {
      id: 'users',
      label: 'Usuarios',
      icon: Users2,
    },
  ]

  return (
    <aside className="w-64 bg-primary text-primary-foreground flex flex-col border-r border-border">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center justify-center">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-accent-foreground" />
          </div>
          <span className="ml-3 text-2xl font-bold">maqui+</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {modules.map((module) => {
          const Icon = module.icon
          const isActive = activeModule === module.id

          return (
            <button
              key={module.id}
              onClick={() => onModuleChange(module.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'text-primary-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{module.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="mb-4">
          <p className="text-sm text-primary-foreground/80">{user?.name}</p>
          <p className="text-xs text-primary-foreground/60">{user?.role}</p>
        </div>
        <Button
          onClick={logout}
          variant="outline"
          className="w-full flex items-center justify-center space-x-2 border-primary-foreground text-primary-foreground hover:bg-primary/80 bg-transparent"
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar Sesión</span>
        </Button>
      </div>
    </aside>
  )
}
