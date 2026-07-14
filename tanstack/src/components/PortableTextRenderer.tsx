import { PortableText } from '@portabletext/react'
import type { PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === 'string' ? value.href : undefined
      const openInNewTab = value?.openInNewTab === true

      if (!href) return <>{children}</>

      return (
        <a
          href={href}
          target={openInNewTab ? '_blank' : undefined}
          rel={openInNewTab ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      )
    },
  },
}

export function PortableTextRenderer({
  value,
}: {
  value: PortableTextBlock[]
}) {
  return <PortableText value={value} components={components} />
}
