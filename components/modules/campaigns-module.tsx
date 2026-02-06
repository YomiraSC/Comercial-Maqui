'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { CampaignModal } from './modals/campaign-modal'

interface Campaign {
  id: string
  name: string
  database: string
  filters: string
  template: string
  status: 'Activa' | 'Pausada' | 'Completada'
  leads: number
  createdDate: string
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Campaña Spring 2024',
    database: 'Clientes Premium',
    filters: 'Edad 25-45, Zona Madrid',
    template: 'Welcome Email',
    status: 'Activa',
    leads: 150,
    createdDate: '2024-02-01',
  },
  {
    id: '2',
    name: 'Reactivación Q1',
    database: 'Clientes Inactivos',
    filters: 'Último contacto hace 90 días',
    template: 'Come Back Offer',
    status: 'Pausada',
    leads: 200,
    createdDate: '2024-01-15',
  },
]

export function CampaignsModule() {
  const [campaigns, setCampaigns] = useState(mockCampaigns)
  const [showModal, setShowModal] = useState(false)

  const handleDelete = (id: string) => {
    setCampaigns(campaigns.filter((c) => c.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activa':
        return 'bg-green-50 text-green-700 border border-green-200'
      case 'Pausada':
        return 'bg-yellow-50 text-yellow-700 border border-yellow-200'
      case 'Completada':
        return 'bg-blue-50 text-blue-700 border border-blue-200'
      default:
        return ''
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-background border-b border-border p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Campañas</h1>
            <p className="text-muted-foreground mt-1">Gestiona tus campañas comerciales</p>
          </div>
          <Button
            onClick={() => setShowModal(true)}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nueva Campaña
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-foreground">{campaign.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(campaign.status)}`}>
                    {campaign.status}
                  </span>
                </div>

                <div className="space-y-3 mb-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Base de Datos</p>
                    <p className="text-foreground font-medium">{campaign.database}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Filtros</p>
                    <p className="text-foreground text-xs">{campaign.filters}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Plantilla</p>
                    <p className="text-foreground font-medium">{campaign.template}</p>
                  </div>
                  <div className="flex justify-between pt-2">
                    <div>
                      <p className="text-muted-foreground text-xs">Leads</p>
                      <p className="text-foreground font-bold">{campaign.leads}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Creada</p>
                      <p className="text-foreground text-sm">{campaign.createdDate}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                  >
                    <Edit2 className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(campaign.id)}
                    className="text-accent hover:text-accent hover:bg-accent/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {campaigns.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No hay campañas creadas</p>
            <Button onClick={() => setShowModal(true)} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Crear Primera Campaña
            </Button>
          </div>
        )}
      </div>

      {showModal && <CampaignModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
