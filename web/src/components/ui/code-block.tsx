import { type ComponentProps, useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'
import { twMerge } from 'tailwind-merge'

interface CodeBlockProps extends ComponentProps<'div'> {
  code: string
  language?: string
}

export function CodeBlock({ code, language = 'json', className, ...props }: CodeBlockProps) {
  const [parsedCode, setParseCode] = useState('')

  useEffect(() => {
    if (code) {
      codeToHtml(code, { lang: language, theme: 'vesper' }).then((parsed) => setParseCode(parsed))
    }
  }, [code, language])

  return (
    <div
      className={twMerge(['relative rounded-lg border-zinc-700 overflow-x-auto', className])}
      {...props}
    >
      <div
        className="[$_pre]:p-4 [$_pre]:text-sm [$_pre]:font-mono [$_pre]:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: parsedCode }}
      ></div>
    </div>
  )
}
