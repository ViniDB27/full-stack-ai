import { useSuspenseQuery } from '@tanstack/react-query'
import { webhookSchema } from '../http/schemas/webhooks.ts'
import { Header } from './header.tsx'
import { SectionTitle } from './section-title.tsx'
import { SectionDataTable } from './section-data-table.tsx'
import { CodeBlock } from './ui/code-block.tsx'

interface WebhookDetailProps {
  id: string
}

export function WebhookDetail({ id }: WebhookDetailProps) {
  const { data } = useSuspenseQuery({
    queryKey: ['webhook', id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/api/webhooks/${id}`)
      const data = await response.json()
      return webhookSchema.parse(data)
    },
  })

  const overviewData = [
    { key: 'Method', value: data.method },
    { key: 'Status Code', value: String(data.statusCode) },
    { key: 'Content-Type', value: data.contentType || 'application/json' },
    { key: 'Content-Length', value: `${data.contentLength || 0} bytes` },
  ]

  const headers = Object.entries(data.headers).map(([key, value]) => ({
    key,
    value: String(value),
  }))
  const queryParams = Object.entries(data.queryParams || {}).map(([key, value]) => ({
    key,
    value: String(value),
  }))

  return (
    <div className="flex h-full flex-col">
      <Header
        method={data.method}
        pathname={data.pathname}
        ip={data.ip}
        created_at={data.created_at}
      />
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-6">
          <div className="space-y-4">
            <SectionTitle>Request Overview</SectionTitle>
            <SectionDataTable data={overviewData} />
          </div>

          <div className="space-y-4">
            <SectionTitle>Headers</SectionTitle>
            <SectionDataTable data={headers} />
          </div>

          {queryParams.length > 0 && (
            <div className="space-y-4">
              <SectionTitle>Query</SectionTitle>
              <SectionDataTable data={queryParams} />
            </div>
          )}

          {data.body && (
            <div className="space-y-4">
              <SectionTitle>Request Body</SectionTitle>
              <CodeBlock code={data.body} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
