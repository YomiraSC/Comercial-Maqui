'use client'

import React from "react"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { X } from 'lucide-react'
import { useState } from 'react'

interface Template {
  id: string
  name: string
  subject: string
  content: string
  type: 'Email' | 'SMS' | 'WhatsApp'
  createdDate: string
}

interface TemplateModalProps {
  template: Template | null
  onClose: () => void
}

export function TemplateModal({ template, onClose }: TemplateModalProps) {
  const [formData, setFormData] = useState({
    name: template?.name || '',
    type: template?.type || 'Email',
    subject: template?.subject || '',
    content: template?.content || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">
            {template ? 'Editar Plantilla' : 'Nueva Plantilla'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej: Welcome Email"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Tipo</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary"
              >
                <option value="Email">Email</option>
                <option value="SMS">SMS</option>
                <option value="WhatsApp">WhatsApp</option>
              </select>
            </div>
          </div>

          {formData.type === 'Email' && (
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Asunto del Email</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Ej: Bienvenido a maqui+"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Contenido</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Escribe el contenido de la plantilla. Usa {nombre}, {email}, etc. para variables personalizadas"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary h-40 resize-none"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Variables disponibles: {'{nombre}'}, {'{email}'}, {'{teléfono}'}, {'{fecha}'}
            </p>
          </div>

          <div className="bg-secondary/50 border border-border rounded-lg p-4">
            <p className="text-sm font-semibold text-foreground mb-2">Vista Previa</p>
            {formData.type === 'Email' && formData.subject && (
              <p className="text-sm text-muted-foreground">Asunto: {formData.subject}</p>
            )}
            <p className="text-sm text-muted-foreground mt-2">Cuerpo:</p>
            <p className="text-sm text-foreground mt-1 whitespace-pre-wrap">{formData.content.substring(0, 150)}...</p>
          </div>
        </form>

        <div className="p-6 border-t border-border flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            {template ? 'Actualizar Plantilla' : 'Crear Plantilla'}
          </Button>
        </div>
      </Card>
    </div>
  )
}
