'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { X } from 'lucide-react'

interface ActionModalProps {
  lead: {
    id: string
    name: string
    phone: string
    dni: string
  }
  onClose: () => void
}

export function ActionModal({ lead, onClose }: ActionModalProps) {
  const actions = [
    {
      id: 1,
      title: 'Llamada Telefónica',
      description: 'Registra una llamada con el lead',
      icon: '☎️',
    },
    {
      id: 2,
      title: 'Enviar Email',
      description: 'Envía un email al lead',
      icon: '📧',
    },
    {
      id: 3,
      title: 'Agendar Reunión',
      description: 'Crea una cita con el lead',
      icon: '📅',
    },
    {
      id: 4,
      title: 'Nota Interna',
      description: 'Añade notas sobre el lead',
      icon: '📝',
    },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg">
        <div className="flex justify-between items-center p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-foreground">Acciones Comerciales</h2>
            <p className="text-sm text-muted-foreground mt-1">{lead.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <div className="p-6 space-y-3">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={onClose}
              className="w-full p-4 border border-border rounded-lg hover:border-primary hover:bg-secondary transition-all text-left"
            >
              <div className="flex items-start">
                <span className="text-2xl mr-3">{action.icon}</span>
                <div>
                  <h3 className="font-semibold text-foreground">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="p-6 border-t border-border flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </Card>
    </div>
  )
}
