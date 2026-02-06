'use client';

import { Users, ListChecks as ListTasks, Mail, MessageSquare, Users2 } from 'lucide-react'

interface SidebarProps {
  activeModule: string
  onModuleChange: (module: any) => void
}

export function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
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
      id: 'templates',
      label: 'Plantillas',
      icon: Mail,
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

      <div className="p-4 border-t border-sidebar-border text-sm text-primary-foreground/80">
        <p>CRM Comercial</p>
        <p className="text-xs mt-1">v1.0</p>
      </div>
    </aside>
  )
}
