'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/layout/sidebar'
import { LeadsModule } from '@/components/modules/leads-module'
import { TasksModule } from '@/components/modules/tasks-module'
import { CampaignsModule } from '@/components/modules/campaigns-module'
import { TemplatesModule } from '@/components/modules/templates-module'
import { UsersModule } from '@/components/modules/users-module'

type ModuleType = 'leads' | 'tasks' | 'campaigns' | 'templates' | 'users'

export default function Home() {
  const [activeModule, setActiveModule] = useState<ModuleType>('leads')

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          {activeModule === 'leads' && <LeadsModule />}
          {activeModule === 'tasks' && <TasksModule />}
          {activeModule === 'campaigns' && <CampaignsModule />}
          {activeModule === 'templates' && <TemplatesModule />}
          {activeModule === 'users' && <UsersModule />}
        </div>
      </main>
    </div>
  )
}
