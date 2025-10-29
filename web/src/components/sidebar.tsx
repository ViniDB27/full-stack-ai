import { IconButton } from './ui/icon-button.tsx'
import { CopyIcon } from 'lucide-react'
import { WebhooksList } from './webhooks-list.tsx'
import { Suspense } from 'react'

export function Sidebar() {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex items-center justify-between border-b border-zinc-700 px-4 py-5">
        <div className="flex items-baseline">
          <span className="font-semibold text-zinc-100">Webhook</span>
          <span className="font-normal text-zinc-400">.inspect</span>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-zinc-700 bg-zinc-800 px-4 py-2.5">
        <div className="flex-1 min-2-0 flex items-center gap-1 text-xs font-mono text-zinc-300">
          <span className="truncate">hppt://localhost:3333/api/capture</span>
        </div>
        <IconButton icon={<CopyIcon className="size-4" />} />
      </div>

      <Suspense fallback={<p>Carregando...</p>}>
        <WebhooksList />
      </Suspense>
    </div>
  )
}
