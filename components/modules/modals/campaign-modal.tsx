'use client'

import React from "react"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { X } from 'lucide-react'
import { useState } from 'react'

interface CampaignModalProps {
  onClose: () => void
}

export function CampaignModal({ onClose }: CampaignModalProps) {
  const [step, setStep] = useState<'basic' | 'config'>('basic')
  const [formData, setFormData] = useState({
    name: '',
    database: 'Clientes Premium',
    filters: '',
    template: 'Welcome Email',
  })

  const databases = ['Clientes Premium', 'Clientes Activos', 'Clientes Inactivos', 'Nuevos Leads']
  const templates = ['Welcome Email', 'Come Back Offer', 'Product Announcement', 'Special Offer']
  const filterOptions = ['Edad 25-45', 'Zona Madrid', 'Último contacto hace 90 días', 'Compra anterior']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 'basic') {
      setStep('config')
    } else {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-foreground">Nueva Campaña</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {step === 'basic' ? 'Información básica' : 'Configuración avanzada'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {step === 'basic' ? (
            <>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Nombre de Campaña</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ej: Spring Campaign 2024"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Descripción</label>
                <textarea
                  placeholder="Describe los objetivos de la campaña"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary h-24"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Base de Datos BigQuery</label>
                <select
                  name="database"
                  value={formData.database}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary"
                >
                  {databases.map((db) => (
                    <option key={db} value={db}>
                      {db}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Filtros de Segmentación</label>
                <div className="grid grid-cols-2 gap-2">
                  {filterOptions.map((filter) => (
                    <label key={filter} className="flex items-center">
                      <input
                        type="checkbox"
                        defaultChecked={false}
                        className="rounded border-border"
                      />
                      <span className="ml-2 text-sm text-foreground">{filter}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Plantilla de Mensaje</label>
                <select
                  name="template"
                  value={formData.template}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary"
                >
                  {templates.map((tpl) => (
                    <option key={tpl} value={tpl}>
                      {tpl}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-secondary/50 border border-border rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">Vista Previa</p>
                <p className="text-sm text-muted-foreground">Asunto: Bienvenido a nuestra plataforma</p>
                <p className="text-sm text-muted-foreground mt-2">Cuerpo: Contenido del email con la plantilla seleccionada...</p>
              </div>
            </>
          )}
        </form>

        <div className="p-6 border-t border-border flex justify-between">
          <Button
            variant="outline"
            onClick={step === 'config' ? () => setStep('basic') : onClose}
          >
            {step === 'config' ? 'Atrás' : 'Cancelar'}
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            {step === 'basic' ? 'Siguiente' : 'Crear Campaña'}
          </Button>
        </div>
      </Card>
    </div>
  )
}
