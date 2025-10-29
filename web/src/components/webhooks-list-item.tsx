import {Link} from '@tanstack/react-router'
import {IconButton} from './ui/icon-button.tsx'
import {Trash2Icon} from 'lucide-react'
import {Checkbox} from './ui/checkbox.tsx'
import {formatDistanceToNow} from 'date-fns'
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "../routes/__root.tsx";

interface WebhooksListItemProps {
  webhook: {
    id: string
    method: string
    pathname: string
    created_at: Date
  }
}

export function WebhooksListItem({webhook}: WebhooksListItemProps) {
  const {mutate: deleteWebhook} = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`http://localhost:3333/api/webhooks/${id}`, {method: 'DELETE'})
    },
    onSuccess: async (data: any) => {
      queryClient.invalidateQueries({queryKey: ['webhooks']})
    }
  })

  return (
    <div className="group rounded-lg transition-colors duration-150 hover:bg-zinc-700/30 ">
      <div className="flex items-start gap-3 px-4 py-2.5">
        <Checkbox/>
        <Link
          to="/webhooks/$id"
          params={{id: webhook.id}}
          className="flex flex-1 min-w-0 items-start gap-3"
        >
          <span className="w-12 shrink-0 font-mono text-xs text-zinc-300 font-semibold text-right">
            {webhook.method}
          </span>
          <div className="flex-1 min-w-0">
            <p className="truncate text-xs text-zinc-200 leading-tight font-mono">
              {webhook.pathname}
            </p>
            <p className="text-xs text-zinc-500 font-medium mt-1">
              {formatDistanceToNow(webhook.created_at, {addSuffix: true})}
            </p>
          </div>
        </Link>
        <IconButton
          className="opacity-0 transition-opacity group-hover:opacity-100"
          icon={<Trash2Icon className="size-3.5 text-zinc-400"/>}
          onClick={() => deleteWebhook(webhook.id)}
        />
      </div>
    </div>
  )
}
