'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Search, ChevronDown } from 'lucide-react'
import { LeadsTable } from './leads-table'
import { LeadModal } from './modals/lead-modal'

export function LeadsModule() {
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="flex flex-col h-full">
      <div className="bg-background border-b border-border p-6">
        <div className="flex justify-between items-center mb-4">
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

        <div className="flex items-center bg-background border border-border rounded-lg px-3 py-2 w-80">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por nombre o DNI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 ml-2 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <LeadsTable searchTerm={searchTerm} />
      </div>

      {showLeadModal && <LeadModal onClose={() => setShowLeadModal(false)} />}
    </div>
  )
}
