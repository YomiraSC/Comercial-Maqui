'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, Settings } from 'lucide-react'

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

interface CampaignDetailModalProps {
  campaign: Campaign
  onClose: () => void
}

export function CampaignDetailModal({ campaign, onClose }: CampaignDetailModalProps) {
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-card max-h-96 overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{campaign.name}</h2>
              <p className="text-muted-foreground text-sm mt-1">ID: {campaign.id}</p>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Estado</p>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(campaign.status)}`}>
                {campaign.status}
              </span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Fecha de Creación</p>
              <p className="font-semibold text-foreground">{campaign.createdDate}</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <p className="text-sm font-semibold text-foreground mb-2">Base de Datos BigQuery</p>
              <div className="bg-secondary p-3 rounded-lg border border-border">
                <p className="text-foreground">{campaign.database}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground mb-2">Filtros de Segmentación</p>
              <div className="bg-secondary p-3 rounded-lg border border-border">
                <p className="text-foreground text-sm">{campaign.filters}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground mb-2">Plantilla Asignada</p>
              <div className="bg-secondary p-3 rounded-lg border border-border">
                <p className="text-foreground">{campaign.template}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">Total de Leads</p>
                <div className="bg-secondary p-3 rounded-lg border border-border">
                  <p className="text-2xl font-bold text-primary">{campaign.leads}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">Enviados</p>
                <div className="bg-secondary p-3 rounded-lg border border-border">
                  <p className="text-2xl font-bold text-green-600">{Math.floor(campaign.leads * 0.8)}</p>
                  <p className="text-xs text-muted-foreground mt-1">{Math.round((Math.floor(campaign.leads * 0.8) / campaign.leads) * 100)}%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-foreground">
                <span className="font-semibold">Cluster:</span> Segmentación avanzada aplicada
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1 bg-transparent"
              >
                Cerrar
              </Button>
              <Button
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Settings className="w-4 h-4 mr-2" />
                Editar Campaña
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
