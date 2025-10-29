import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { WebhookDetail } from '../components/webhook-detail.tsx'

export const Route = createFileRoute('/webhooks/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <WebhookDetail id={id} />
    </Suspense>
  )
}
