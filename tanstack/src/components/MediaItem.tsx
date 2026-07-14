import type { ReactNode } from 'react'
import type { ProjectMedia } from '#/lib/queries'
import { ColorPhoneFrame } from '#/components/ColorPhoneFrame'
import { ProjectVideo } from '#/components/ProjectVideo'

const mediaClassName = 'block max-w-[70vw] max-h-[70vh] w-auto h-auto'

function FramePlaceholder({
  frame,
  children,
}: {
  frame: string
  children: ReactNode
}) {
  return (
    <div className="relative max-w-[70vw] max-h-[70vh]">
      {children}
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white">
        {frame} frame
      </div>
    </div>
  )
}

function withFrame(frame: string | null | undefined, children: ReactNode) {
  if (!frame) return children
  if (frame === 'phone') {
    return <ColorPhoneFrame color="#000000">{children}</ColorPhoneFrame>
  }
  return <FramePlaceholder frame={frame}>{children}</FramePlaceholder>
}

export function MediaItem({ item }: { item: ProjectMedia }) {
  const framed = Boolean(item.frame)

  if (item._type === 'image') {
    if (!item.url) return null
    const image = (
      <img
        src={item.url}
        alt={item.alt ?? ''}
        className={framed ? 'block h-full w-full object-cover' : mediaClassName}
      />
    )
    return withFrame(item.frame, image)
  }

  if (!item.playbackId) return null

  if (item.frame === 'phone') {
    return (
      <ProjectVideo
        playbackId={item.playbackId}
        aspectRatio={item.aspectRatio}
        framed
      />
    )
  }

  const video = (
    <ProjectVideo
      playbackId={item.playbackId}
      aspectRatio={item.aspectRatio}
    />
  )

  return withFrame(item.frame, video)
}
