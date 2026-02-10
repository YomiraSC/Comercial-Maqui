'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { LoginForm } from '@/components/auth/login-form'
import { Sidebar } from '@/components/layout/sidebar'
import { LeadsModule } from '@/components/modules/leads-module'
import { TasksModule } from '@/components/modules/tasks-module'
import { CampaignsModule } from '@/components/modules/campaigns-module'
import { CalendarModule } from '@/components/modules/calendar-module'
import { TemplatesModule } from '@/components/modules/templates-module'
import { UsersModule } from '@/components/modules/users-module'
import { BotCostModule } from '@/components/modules/bot-cost-module'
import { RoutingRulesModule } from '@/components/modules/routing-rules-module'

type ModuleType = 'leads' | 'tasks' | 'campaigns' | 'calendar' | 'templates' | 'users' | 'bot-cost' | 'routing-rules'

export default function Home() {
  const { isAuthenticated, loading } = useAuth()
  const [activeModule, setActiveModule] = useState<ModuleType>('leads')

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="text-4xl font-bold text-primary mb-4">maqui+</div>
          <div className="text-muted-foreground">Cargando...</div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          {activeModule === 'leads' && <LeadsModule />}
          {activeModule === 'tasks' && <TasksModule />}
          {activeModule === 'campaigns' && <CampaignsModule />}
          {activeModule === 'calendar' && <CalendarModule />}
          {activeModule === 'templates' && <TemplatesModule />}
          {activeModule === 'users' && <UsersModule />}
          {activeModule === 'bot-cost' && <BotCostModule initialLeads={150} />}
          {activeModule === 'routing-rules' && <RoutingRulesModule />}
        </div>
      </main>
    </div>
  )
}
