'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Search, X } from 'lucide-react'
import { LeadsTable } from './leads-table'
import { LeadModal } from './modals/lead-modal'

export function LeadsModule() {
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPriority, setFilterPriority] = useState<string>('')
  const [filterStatus, setFilterStatus] = useState<string>('')
  const [filterDate, setFilterDate] = useState<string>('')

  const activeFilters = [
    filterPriority && `Prioridad: ${filterPriority}`,
    filterStatus && `Estado: ${filterStatus}`,
    filterDate && `Desde: ${filterDate}`,
  ].filter(Boolean)

  const clearFilters = () => {
    setFilterPriority('')
    setFilterStatus('')
    setFilterDate('')
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-background border-b border-border p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Leads</h1>
            <p className="text-muted-foreground mt-1">Gestión de leads comerciales</p>
          </div>
          <Button
            onClick={() => setShowLeadModal(true)}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Lead
          </Button>
        </div>

        <div className="flex gap-3 flex-wrap">
          <div className="flex items-center bg-background border border-border rounded-lg px-3 py-2 flex-1 max-w-md">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nombre o DNI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 ml-2 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Todas las Prioridades</option>
            <option value="Alta">Prioridad Alta</option>
            <option value="Media">Prioridad Media</option>
            <option value="Baja">Prioridad Baja</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Todos los Estados</option>
            <option value="Nuevo">Nuevo</option>
            <option value="En Contacto">En Contacto</option>
            <option value="Cualificado">Cualificado</option>
            <option value="Ganado">Ganado</option>
            <option value="Perdido">Perdido</option>
          </select>

          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Fecha de asignación"
          />

          {activeFilters.length > 0 && (
            <Button
              variant="outline"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground bg-transparent"
            >
              <X className="w-4 h-4 mr-2" />
              Limpiar
            </Button>
          )}
        </div>

        {activeFilters.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {activeFilters.map((filter) => (
              <div key={filter} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/20">
                {filter}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto">
        <LeadsTable 
          searchTerm={searchTerm}
          filterPriority={filterPriority}
          filterStatus={filterStatus}
          filterDate={filterDate}
        />
      </div>

      {showLeadModal && <LeadModal onClose={() => setShowLeadModal(false)} />}
    </div>
  )
}
