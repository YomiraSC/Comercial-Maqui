'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { X } from 'lucide-react'
import { ChartContainer } from '@/components/ui/chart'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

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
  // mock histórico: fechas recientes con distribución por estado
  const history = [
    { date: '2024-01-28', Nuevo: 5, 'En Contacto': 2, Cualificado: 1 },
    { date: '2024-01-29', Nuevo: 4, 'En Contacto': 3, Cualificado: 1 },
    { date: '2024-01-30', Nuevo: 3, 'En Contacto': 4, Cualificado: 2 },
    { date: '2024-01-31', Nuevo: 3, 'En Contacto': 3, Cualificado: 3 },
    { date: '2024-02-01', Nuevo: 2, 'En Contacto': 4, Cualificado: 4 },
  ]

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

          <div>
            <label className="text-sm font-semibold text-muted-foreground">Histórico de estados</label>
            <div className="mt-3 bg-secondary p-3 rounded-lg border border-border">
              <ChartContainer config={{ Nuevo: { label: 'Nuevo', color: '#3b82f6' }, 'En Contacto': { label: 'En Contacto', color: '#f59e0b' }, Cualificado: { label: 'Cualificado', color: '#10b981' } }}>
                <ResponsiveContainer>
                  <LineChart data={history}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="Nuevo" stroke="#3b82f6" strokeWidth={2} dot={{ r: 2 }} />
                    <Line type="monotone" dataKey="En Contacto" stroke="#f59e0b" strokeWidth={2} dot={{ r: 2 }} />
                    <Line type="monotone" dataKey="Cualificado" stroke="#10b981" strokeWidth={2} dot={{ r: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
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
