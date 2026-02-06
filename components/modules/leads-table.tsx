'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MoreVertical, Eye, MessageSquare, Briefcase } from 'lucide-react'
import { ActionModal } from './modals/action-modal'
import { ConversationModal } from './modals/conversation-modal'
import { LeadDetailModal } from './modals/lead-detail-modal'

interface Lead {
  id: string
  dni: string
  name: string
  phone: string
  status: 'Nuevo' | 'En Contacto' | 'Cualificado' | 'Descalificado'
  assignedDate: string
  product: string
  priority: 'Alta' | 'Media' | 'Baja'
}

const mockLeads: Lead[] = [
  {
    id: '1',
    dni: '12345678',
    name: 'Juan García López',
    phone: '+34 612 345 678',
    status: 'En Contacto',
    assignedDate: '2024-02-01',
    product: 'Plan Premium',
    priority: 'Alta',
  },
  {
    id: '2',
    dni: '87654321',
    name: 'María Rodríguez',
    phone: '+34 622 456 789',
    status: 'Cualificado',
    assignedDate: '2024-02-02',
    product: 'Plan Standard',
    priority: 'Media',
  },
  {
    id: '3',
    dni: '11223344',
    name: 'Carlos Martínez',
    phone: '+34 632 567 890',
    status: 'Nuevo',
    assignedDate: '2024-02-03',
    product: 'Plan Basic',
    priority: 'Baja',
  },
]

interface LeadsTableProps {
  searchTerm: string
}

export function LeadsTable({ searchTerm }: LeadsTableProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [modalType, setModalType] = useState<'action' | 'conversation' | 'detail' | null>(null)

  const filteredLeads = mockLeads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.dni.includes(searchTerm)
  )

  const handleAction = (lead: Lead, type: 'action' | 'conversation' | 'detail') => {
    setSelectedLead(lead)
    setModalType(type)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Alta':
        return 'bg-accent/10 text-accent border border-accent/20'
      case 'Media':
        return 'bg-primary/10 text-primary border border-primary/20'
      case 'Baja':
        return 'bg-muted text-muted-foreground border border-muted/50'
      default:
        return ''
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Nuevo':
        return 'bg-blue-50 text-blue-700 border border-blue-200'
      case 'En Contacto':
        return 'bg-yellow-50 text-yellow-700 border border-yellow-200'
      case 'Cualificado':
        return 'bg-green-50 text-green-700 border border-green-200'
      case 'Descalificado':
        return 'bg-red-50 text-red-700 border border-red-200'
      default:
        return ''
    }
  }

  return (
    <div className="p-6">
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-6 py-3 text-left font-semibold text-foreground">DNI</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Nombre</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Teléfono</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Estado</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Fecha Asignación</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Producto</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Prioridad</th>
                <th className="px-6 py-3 text-right font-semibold text-foreground">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-foreground">{lead.dni}</td>
                  <td className="px-6 py-4 font-medium text-foreground">{lead.name}</td>
                  <td className="px-6 py-4 text-foreground">{lead.phone}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-foreground">{lead.assignedDate}</td>
                  <td className="px-6 py-4 text-foreground">{lead.product}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(lead.priority)}`}>
                      {lead.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAction(lead, 'action')}
                        className="text-foreground hover:bg-secondary"
                        title="Acciones comerciales"
                      >
                        <Briefcase className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAction(lead, 'conversation')}
                        className="text-foreground hover:bg-secondary"
                        title="Ver conversación"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAction(lead, 'detail')}
                        className="text-foreground hover:bg-secondary"
                        title="Ver detalle"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {modalType === 'action' && selectedLead && (
        <ActionModal lead={selectedLead} onClose={() => setModalType(null)} />
      )}
      {modalType === 'conversation' && selectedLead && (
        <ConversationModal lead={selectedLead} onClose={() => setModalType(null)} />
      )}
      {modalType === 'detail' && selectedLead && (
        <LeadDetailModal lead={selectedLead} onClose={() => setModalType(null)} />
      )}
    </div>
  )
}
