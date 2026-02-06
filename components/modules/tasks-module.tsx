'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Eye, MessageSquare, Briefcase } from 'lucide-react'
import { useState } from 'react'
import { ActionModal } from './modals/action-modal'
import { ConversationModal } from './modals/conversation-modal'
import { LeadDetailModal } from './modals/lead-detail-modal'

interface Lead {
  id: string
  dni: string
  name: string
  phone: string
  status: string
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
    dni: '11223344',
    name: 'Carlos Martínez',
    phone: '+34 632 567 890',
    status: 'Nuevo',
    assignedDate: '2024-02-03',
    product: 'Plan Basic',
    priority: 'Alta',
  },
]

const mediaPriorityLeads: Lead[] = [
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
]

const lowPriorityLeads: Lead[] = []

export function TasksModule() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [modalType, setModalType] = useState<'action' | 'conversation' | 'detail' | null>(null)

  const handleAction = (lead: Lead, type: 'action' | 'conversation' | 'detail') => {
    setSelectedLead(lead)
    setModalType(type)
  }

  const LeadCard = ({ lead }: { lead: Lead }) => (
    <div className="p-4 border border-border rounded-lg bg-background hover:border-primary transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{lead.name}</h3>
          <p className="text-sm text-muted-foreground">{lead.dni}</p>
        </div>
      </div>
      <div className="space-y-2 text-sm mb-4">
        <p className="text-foreground">
          <span className="text-muted-foreground">Teléfono:</span> {lead.phone}
        </p>
        <p className="text-foreground">
          <span className="text-muted-foreground">Producto:</span> {lead.product}
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleAction(lead, 'action')}
          className="flex-1 text-foreground hover:bg-secondary"
        >
          <Briefcase className="w-3 h-3 mr-1" />
          Acciones
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleAction(lead, 'conversation')}
          className="flex-1 text-foreground hover:bg-secondary"
        >
          <MessageSquare className="w-3 h-3 mr-1" />
          Chat
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleAction(lead, 'detail')}
          className="flex-1 text-foreground hover:bg-secondary"
        >
          <Eye className="w-3 h-3 mr-1" />
          Ver
        </Button>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col h-full">
      <div className="bg-background border-b border-border p-6">
        <h1 className="text-3xl font-bold text-foreground">Tareas por Prioridad</h1>
        <p className="text-muted-foreground mt-1">Organiza tus leads por nivel de urgencia</p>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Alta Prioridad */}
          <div className="bg-accent/5 rounded-lg border-2 border-accent/30 p-4 h-fit">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-accent rounded-full mr-2" />
              <h2 className="text-lg font-bold text-foreground">Alta Prioridad</h2>
              <span className="ml-auto bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-full">
                {mockLeads.length}
              </span>
            </div>
            <div className="space-y-3">
              {mockLeads.length > 0 ? (
                mockLeads.map((lead) => <LeadCard key={lead.id} lead={lead} />)
              ) : (
                <p className="text-muted-foreground text-center py-4">Sin leads</p>
              )}
            </div>
          </div>

          {/* Media Prioridad */}
          <div className="bg-primary/5 rounded-lg border-2 border-primary/30 p-4 h-fit">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-primary rounded-full mr-2" />
              <h2 className="text-lg font-bold text-foreground">Media Prioridad</h2>
              <span className="ml-auto bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                {mediaPriorityLeads.length}
              </span>
            </div>
            <div className="space-y-3">
              {mediaPriorityLeads.length > 0 ? (
                mediaPriorityLeads.map((lead) => <LeadCard key={lead.id} lead={lead} />)
              ) : (
                <p className="text-muted-foreground text-center py-4">Sin leads</p>
              )}
            </div>
          </div>

          {/* Baja Prioridad */}
          <div className="bg-muted rounded-lg border-2 border-muted/50 p-4 h-fit">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-muted-foreground rounded-full mr-2" />
              <h2 className="text-lg font-bold text-foreground">Baja Prioridad</h2>
              <span className="ml-auto bg-muted text-muted-foreground text-xs font-bold px-2 py-1 rounded-full">
                {lowPriorityLeads.length}
              </span>
            </div>
            <div className="space-y-3">
              {lowPriorityLeads.length > 0 ? (
                lowPriorityLeads.map((lead) => <LeadCard key={lead.id} lead={lead} />)
              ) : (
                <p className="text-muted-foreground text-center py-4">Sin leads</p>
              )}
            </div>
          </div>
        </div>
      </div>

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
