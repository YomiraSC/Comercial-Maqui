'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { X } from 'lucide-react'

interface LeadDetailModalProps {
  lead: {
    id: string
    dni: string
    name: string
    phone: string
    status: string
    assignedDate: string
    product: string
    priority: string
  }
  onClose: () => void
}

export function LeadDetailModal({ lead, onClose }: LeadDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Detalle del Lead</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-muted-foreground">DNI</label>
              <p className="text-foreground font-mono mt-1">{lead.dni}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-muted-foreground">Nombre</label>
              <p className="text-foreground mt-1">{lead.name}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-muted-foreground">Teléfono</label>
              <p className="text-foreground mt-1">{lead.phone}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-muted-foreground">Estado</label>
              <p className="text-foreground mt-1">{lead.status}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-muted-foreground">Fecha Asignación</label>
              <p className="text-foreground mt-1">{lead.assignedDate}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-muted-foreground">Producto de Interés</label>
              <p className="text-foreground mt-1">{lead.product}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-muted-foreground">Prioridad</label>
              <p className="text-foreground mt-1 font-semibold">{lead.priority}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-muted-foreground">Asignado a</label>
              <p className="text-foreground mt-1">Juan Pérez</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-muted-foreground">Notas</label>
            <p className="text-foreground mt-2 text-sm">Cliente potencial con alto interés en planes premium. Se requiere seguimiento dentro de 48 horas.</p>
          </div>
        </div>

        <div className="p-6 border-t border-border flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Editar Lead
          </Button>
        </div>
      </Card>
    </div>
  )
}
