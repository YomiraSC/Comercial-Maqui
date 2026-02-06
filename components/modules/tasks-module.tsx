'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Eye, MessageSquare, Briefcase, ChevronDown } from 'lucide-react'
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

const allLeads: Lead[] = [
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
  {
    id: '3',
    dni: '87654321',
    name: 'María Rodríguez',
    phone: '+34 622 456 789',
    status: 'Cualificado',
    assignedDate: '2024-02-02',
    product: 'Plan Standard',
    priority: 'Media',
  },
  {
    id: '4',
    dni: '55667788',
    name: 'Ana Fernández',
    phone: '+34 645 234 567',
    status: 'Interesado',
    assignedDate: '2024-02-04',
    product: 'Plan Basic',
    priority: 'Media',
  },
]

const mockLeads = allLeads.filter(lead => lead.priority === 'Alta')
const mediaPriorityLeads = allLeads.filter(lead => lead.priority === 'Media')
const lowPriorityLeads = allLeads.filter(lead => lead.priority === 'Baja')

export function TasksModule() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [modalType, setModalType] = useState<'action' | 'conversation' | 'detail' | null>(null)
  const [expandedPriority, setExpandedPriority] = useState<'Alta' | 'Media' | 'Baja' | null>(null)

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

  const altaLeads = allLeads.filter(l => l.priority === 'Alta')
  const mediaLeads = allLeads.filter(l => l.priority === 'Media')
  const bajaLeads = allLeads.filter(l => l.priority === 'Baja')

  const altaCompletados = Math.floor(altaLeads.length * 0.4)
  const mediaCompletados = Math.floor(mediaLeads.length * 0.3)
  const bajaCompletados = Math.floor(bajaLeads.length * 0.2)

  const PriorityBox = ({ 
    title, 
    color, 
    leads, 
    completed, 
    priority 
  }: { 
    title: string
    color: string
    leads: Lead[]
    completed: number
    priority: 'Alta' | 'Media' | 'Baja'
  }) => {
    const isExpanded = expandedPriority === priority
    return (
      <Card className={`${color} border-2 p-6 transition-all`}>
        <button
          onClick={() => setExpandedPriority(isExpanded ? null : priority)}
          className="w-full text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full" style={{
                backgroundColor: color === 'bg-accent/5' ? 'rgb(230, 57, 70)' : 
                                 color === 'bg-primary/5' ? 'rgb(13, 107, 125)' : 'rgb(180, 180, 180)'
              }} />
              <h2 className="text-xl font-bold text-foreground">{title}</h2>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </div>
        </button>
        
        <div className="flex gap-4 mt-4 mb-4">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-2xl font-bold text-foreground">{leads.length}</p>
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Completados</p>
            <p className="text-2xl font-bold text-green-600">{completed}</p>
            <p className="text-xs text-muted-foreground">{leads.length > 0 ? Math.round((completed / leads.length) * 100) : 0}%</p>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-3 mt-4 pt-4 border-t border-border">
            {leads.length > 0 ? (
              leads.map((lead) => <LeadCard key={lead.id} lead={lead} />)
            ) : (
              <p className="text-muted-foreground text-center py-4">Sin leads en esta prioridad</p>
            )}
          </div>
        )}
      </Card>
    )
  }

  return (
    <div className="p-6 h-full overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tareas por Prioridad</h1>
          <p className="text-muted-foreground mt-1">Organiza tus leads por nivel de urgencia</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PriorityBox 
            title="Alta Prioridad"
            color="bg-accent/5"
            leads={altaLeads}
            completed={altaCompletados}
            priority="Alta"
          />
          <PriorityBox 
            title="Media Prioridad"
            color="bg-primary/5"
            leads={mediaLeads}
            completed={mediaCompletados}
            priority="Media"
          />
          <PriorityBox 
            title="Baja Prioridad"
            color="bg-muted"
            leads={bajaLeads}
            completed={bajaCompletados}
            priority="Baja"
          />
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
