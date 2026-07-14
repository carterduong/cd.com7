import MuxPlayer from '@mux/mux-player-react'
import { useState, type ComponentProps } from 'react'
import { ColorPhoneFrame } from '#/components/ColorPhoneFrame'

function videoStyle(aspectRatio?: string | null): ComponentProps<typeof MuxPlayer>['style'] {
  const [w, h] = aspectRatio?.split(':').map(Number) ?? []
  if (!w || !h) {
    return {
      maxWidth: '70vw',
      maxHeight: '70vh',
      width: 'auto',
      height: 'auto',
    }
  }

  return {
    aspectRatio: `${w} / ${h}`,
    maxWidth: '70vw',
    maxHeight: '70vh',
    width: `min(70vw, calc(70vh * ${w} / ${h}))`,
    height: 'auto',
  }
}

export function ProjectVideo({
  playbackId,
  aspectRatio,
  framed,
}: {
  playbackId: string
  aspectRatio?: string | null
  framed?: boolean
}) {
  const [playing, setPlaying] = useState(false)

  const player = (
    <MuxPlayer
      playbackId={playbackId}
      poster=""
      autoPlay
      muted
      loop
      playsInline
      accentColor="#000000"
      onPlaying={() => setPlaying(true)}
      style={{
        ...(framed
          ? {
              width: '100%',
              height: '100%',
              ['--media-object-fit' as string]: 'cover',
            }
          : videoStyle(aspectRatio)),
        opacity: playing ? 1 : 0,
        transition: 'opacity 600ms ease',
        ['--controls' as string]: 'none',
      }}
    />
  )

  if (framed) {
    return <ColorPhoneFrame color="#000000">{player}</ColorPhoneFrame>
  }

  return player
}
